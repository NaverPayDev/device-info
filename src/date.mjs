import fs from "fs/promises";

async function writeDate() {
  const now = new Date();
  await fs.writeFile(
    "./src/data/date.json",
    JSON.stringify(now.toISOString())
  );
}

export default writeDate;
