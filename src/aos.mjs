import { writeFile } from "fs/promises";
import { parse } from "node-html-parser";
import { parseHtmlTable } from "./utils/parseHtmlTable.mjs";

async function fetchDeviceInfoAOS() {
  const res = await fetch(
    "https://storage.googleapis.com/play_public/supported_devices.html"
  );

  const htmlString = await res.text();
  const document = parse(htmlString);
  const table = document.querySelector("table.nice-table");
  const tableData = parseHtmlTable(table);

  const record = {};
  tableData.forEach((product) => {
    const marketingName = product["Marketing Name"];
    if (marketingName) {
      record[product.Model] = marketingName;
    }
  });

  if (Object.keys(record).length > 0) {
    await writeFile("./src/data/aos.json", JSON.stringify(record, null, "\t"));
    console.log(`✓ Successfully saved ${Object.keys(record).length} AOS devices`);
  }
}

export default fetchDeviceInfoAOS;
