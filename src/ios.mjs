import { writeFile } from "fs/promises";
import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { parse } from "node-html-parser";
import { parseHtmlTable } from "./utils/parseHtmlTable.mjs";

chromium.use(StealthPlugin());

async function fetchDeviceInfoIOS() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto("https://theapplewiki.com/wiki/Models", {
      waitUntil: "load",
      timeout: 60000
    });

    await page.waitForTimeout(3000);

    const htmlString = await page.content();
    const document = parse(htmlString);

    const allTableData = {};
    const tables = document.querySelectorAll("table.wikitable");

    for (const table of tables) {
      let parent = table.parentNode;
      while (parent && !parent.classList?.contains('citizen-section')) {
        parent = parent.parentNode;
      }
      const heading = parent?.previousElementSibling;
      const brand = heading?.querySelector('.mw-headline')?.id;
      const wantedBrand = brand?.includes("iPhone") || brand?.includes("iPad");
      if (!wantedBrand) {
        continue;
      }

      const tableData = parseHtmlTable(table);
      if (allTableData[brand]) {
        allTableData[brand].push(...tableData);
      } else {
        allTableData[brand] = tableData;
      }
    }

    const record = {};
    for (const products of Object.values(allTableData)) {
      for (const product of products) {
        const id = product.Identifier;
        if (id && id !== "Unknown") {
          record[id] = product.Generation;
        }
      }
    }

    if (Object.keys(record).length > 0) {
      await writeFile("./src/data/ios.json", JSON.stringify(record, null, "\t"));
      console.log(`✓ Successfully saved ${Object.keys(record).length} iOS devices`);
    }
  } finally {
    await browser.close();
  }
}

export default fetchDeviceInfoIOS;
