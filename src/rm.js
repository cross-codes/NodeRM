import fs from "node:fs";
import os from "node:os";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

const argv = yargs(hideBin(process.argv))
  .option("r", {
    alias: "recursive",
    type: "boolean",
    description: "Flag to remove recursively",
  })
  .option("path", {
    type: "string",
    description: "The path to the file or directory to be removed",
    demandOption: true,
  })
  .help()
  .alias("help", "h")
  .argv;

let path = argv.path;
const opts = (argv.r === true) ? { recursive: true } : {};
const IS_WINDOWS = os.type().includes("Windows_NT");

if (IS_WINDOWS) {
  path = path.replaceAll("/", "\\");
}

async function rm() {
  try {
    const stats = await fs.promises.stat(path);
    if (!stats.isDirectory() && !stats.isFile()) {
      throw new Error("Invalid path specified");
    }
    await fs.promises.rm(path, opts);
    console.log("Removal succesfull");
  } catch (e) {
    console.error(`Error caught while removing: ${e.message}$`);
  }
}

rm();
