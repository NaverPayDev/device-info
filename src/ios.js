import { writeFile } from "fs/promises";
import fetch from "node-fetch";
import { parse } from "node-html-parser";

/**
 * @see https://github.com/ottocho/ios-devices-table/blob/master/main.py
 * js로 재구현
 */
const trimText = (text) => text?.replace(/\n|"/gi, " ").trim();
async function fetchDeviceInfoIOS() {
  const res = await fetch("https://theapplewiki.com/wiki/Models");
  const htmlString = await res.text();
  const document = parse(htmlString);

  const all_table_data = {};
  const tables = document.querySelectorAll("table.wikitable");

  for (const table of tables) {
    const _table_data = [];

    const heading = table.parentNode.previousElementSibling;
    const brand = heading.childNodes[1]?.id;
    const wantedBrand = brand.includes("iPhone") || brand.includes("iPad");
    if (!wantedBrand) {
      continue;
    }

    const temp_tds = {};
    let n_column = 0;
    let names_column = [];

    const trs = table.querySelectorAll("tr");
    for (let n = 0; n < trs.length; n++) {
      if (n === 0) {
        const ths = trs[n].querySelectorAll("th");
        names_column = ths.map(({ textContent }) => trimText(textContent));
        n_column = names_column.length;
        for (let i = 0; i < n_column; i++) {
          temp_tds[i] = null;
        }
        continue;
      }
      const tds = trs[n].querySelectorAll("td");
      const _colected_tds = [];

      if (n === 1) {
        for (let j = 0; j < tds.length; j++) {
          const td = tds[j];
          const rowspan = Number(td.getAttribute("rowspan"));
          if (rowspan) {
            temp_tds[j] = [td, rowspan];
          } else {
            temp_tds[j] = [td, 1];
          }
        }
      }

      let keepIndex = 0;
      for (let k = 0; k < n_column; k++) {
        const temp_td = temp_tds[k];
        if (temp_td) {
          temp_td[1] -= 1;
          const [td, cols] = temp_td;
          _colected_tds.push(td);

          if (cols === 0) {
            temp_tds[k] = null;
          }
        } else {
          for (; keepIndex < tds.length; ) {
            const td = tds[keepIndex];
            const rowspan = Number(td.getAttribute("rowspan"));
            if (rowspan) {
              temp_tds[k] = [td, rowspan - 1];
              _colected_tds.push(td);
            } else {
              _colected_tds.push(td);
            }
            keepIndex++;
            break;
          }
        }
      }

      const _row_data = {};

      for (let i = 0; i < n_column; i++) {
        const td = _colected_tds[i];
        if (td) {
          const value = td.querySelector("a")?.textContent || td.textContent;
          _row_data[names_column[i]] = trimText(value);
        }
      }
      _table_data.push(_row_data);
    }
    all_table_data[brand] = _table_data;
  }

  const brands = Object.keys(all_table_data);
  const record = {};
  brands.forEach((brand) => {
    const products = all_table_data[brand];
    return products.forEach((product) => {
      record[product.Identifier] = product.Generation;
    });
  });

  if (record && Object.keys(record).length > 0) {
    await writeFile("./ios.json", JSON.stringify(record, null, "\t"));
  }
}

export default fetchDeviceInfoIOS;
