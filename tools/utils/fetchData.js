import { logger } from "./logger.js";
import { join } from "path";
import { writeFileSync } from "fs";

export async function fetchData() {
  logger.log("Fetching data...");

  const result = await fetch(
    "https://api-pokemon-fr.vercel.app/api/v1/pokemon"
  );

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
  writeFileSync(outputPath, JSON.stringify(data, null, 2));
  logger.log("Data fetched successfully");
}
