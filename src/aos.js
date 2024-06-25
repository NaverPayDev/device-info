import { writeFile } from "fs/promises";
import fetch from "node-fetch";
import { parse } from "node-html-parser";

const trimText = (text) => text?.replace(/\n|"/gi, " ").trim();
async function fetchDeviceInfoAOS() {
  const res = await fetch(
    "https://storage.googleapis.com/play_public/supported_devices.html"
  );

  const htmlString = await res.text();
  const document = parse(htmlString);

  const table = document.querySelector("table.nice-table");

  const table_data = [];

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
    const _collected_tds = [];

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
        _collected_tds.push(td);

        if (cols === 0) {
          temp_tds[k] = null;
        }
      } else {
        for (; keepIndex < tds.length; ) {
          const td = tds[keepIndex];
          const rowspan = Number(td.getAttribute("rowspan"));
          if (rowspan) {
            temp_tds[k] = [td, rowspan - 1];
            _collected_tds.push(td);
          } else {
            _collected_tds.push(td);
          }
          keepIndex++;
          break;
        }
      }
    }

    const _row_data = {};

    for (let i = 0; i < n_column; i++) {
      const td = _collected_tds[i];
      if (td) {
        const value = td.querySelector("a")?.textContent || td.textContent;
        _row_data[names_column[i]] = trimText(value);
      }
    }
    table_data.push(_row_data);
  }

  const record = {};
  table_data.forEach((product) => {
    const marketingName = product["Marketing Name"];
    if (marketingName) {
      // 제품명 없는 경우 제외
      record[product.Model] = marketingName;
    }
  });

  if (record && Object.keys(record).length > 0) {
    await writeFile("./aos.json", JSON.stringify(record, null, "\t"));
  }
}

export default fetchDeviceInfoAOS;
