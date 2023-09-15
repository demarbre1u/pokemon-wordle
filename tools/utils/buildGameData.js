import { logger } from "./logger.js";
import ASCIIFolder from "fold-to-ascii";
import { join } from "path";
import { writeFileSync, readFileSync } from "fs";

export async function buildGameData() {
  const lengthList = {};
  const pokemonNameList = [];

  logger.log("Reading data from disk...");
  const fileData = readFileSync(join("..", "public", "pokemon-data.json"));
  const data = JSON.parse(fileData);

  logger.log("Parsing data...");
  for (let row of data) {
    let name = row.name.fr;

    // Removing accents
    name = ASCIIFolder.foldReplacing(name);
    name = name.toLowerCase();

    if (!name.match(/^[a-z]+$/)) {
      logger.log(`"${name}" is not valid, skipped`);
      continue;
    }

    pokemonNameList.push(name);

    if (!lengthList[name.length]) {
      lengthList[name.length] = 0;
    }
    lengthList[name.length] += 1;
  }

  logger.log("Data parsed");

  const dataToWrite = [
    {
      filename: "pokemon-names.json",
      data: pokemonNameList,
    },
    {
      filename: "pokemon-length-stats.json",
      data: lengthList,
    },
  ];

  for (let i = 0; i < dataToWrite.length; i++) {
    const { filename, data } = dataToWrite[i];

    logger.log(`(${i + 1} / ${dataToWrite.length}) Writing "${filename}"...`);
    const outputPath = join("..", "public", filename);
    writeFileSync(outputPath, JSON.stringify(data, null, 2));
    logger.log(
      `(${i + 1} / ${dataToWrite.length}) Data written to "${outputPath}"`
    );
  }
}
