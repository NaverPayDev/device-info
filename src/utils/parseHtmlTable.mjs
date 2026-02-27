export const trimText = (text) => text?.replace(/\n|"/gi, " ").trim();

export function parseHtmlTable(table) {
  const tableData = [];
  const tempTds = {};
  let nColumn = 0;
  let namesColumn = [];
  const trs = table.querySelectorAll("tr");

  for (let n = 0; n < trs.length; n++) {
    if (n === 0) {
      const ths = trs[n].querySelectorAll("th");
      namesColumn = ths.map(({ textContent }) => trimText(textContent));
      nColumn = namesColumn.length;
      for (let i = 0; i < nColumn; i++) {
        tempTds[i] = null;
      }
      continue;
    }
    const tds = trs[n].querySelectorAll("td");
    const collectedTds = [];

    if (n === 1) {
      for (let j = 0; j < tds.length; j++) {
        const td = tds[j];
        const rowspan = Number(td.getAttribute("rowspan"));
        tempTds[j] = [td, rowspan || 1];
      }
    }

    let keepIndex = 0;
    for (let k = 0; k < nColumn; k++) {
      const tempTd = tempTds[k];
      if (tempTd) {
        tempTd[1] -= 1;
        const [td, cols] = tempTd;
        collectedTds.push(td);
        if (cols === 0) {
          tempTds[k] = null;
        }
      } else if (keepIndex < tds.length) {
        const td = tds[keepIndex];
        const rowspan = Number(td.getAttribute("rowspan"));
        if (rowspan) {
          tempTds[k] = [td, rowspan - 1];
        }
        collectedTds.push(td);
        keepIndex++;
      }
    }

    const rowData = {};
    for (let i = 0; i < nColumn; i++) {
      const td = collectedTds[i];
      if (td) {
        const value = td.querySelector("a")?.textContent || td.textContent;
        rowData[namesColumn[i]] = trimText(value);
      }
    }
    tableData.push(rowData);
  }

  return tableData;
}
