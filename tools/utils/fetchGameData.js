import fs from "fs";
import { join } from "path";
import process from "process";

import { POKEAPI_URL, POKEMON_DATA_PATH } from "../constants.js";
import { logger } from "./logger.js";
import { promptOverride } from "./prompt.js";

export async function fetchGameData({ overwrite }) {
  const alreadyExists = fs.existsSync(POKEMON_DATA_PATH);
  if (alreadyExists) {
    const shouldOverwrite = overwrite || (await promptOverride());
    if (!shouldOverwrite) {
      process.exit(0);
    }
  }

  logger.log("Fetching data...");

  const result = await fetch(POKEAPI_URL);

  if (!result.ok) {
    const errorMessage = await result.text();
    logger.log(
      `An error occured while trying to fetch data : ${errorMessage}`,
      "ERROR"
    );
    throw new Error(errorMessage);
  }

  const data = await result.json();
  logger.log("Writing data to disk...");
  const outputPath = join("..", "public", "pokemon-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  logger.log("Data fetched successfully");
}
