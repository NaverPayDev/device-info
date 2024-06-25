import fs from "fs/promises";

async function writeDate() {
  const now = new Date();
  await fs.writeFile(
    "./date.js",
    `/*This file was automatically generated. Do not modify it manually.*/
const date = "${now.toISOString()}"
export default date;`
  );
}

export default writeDate;
