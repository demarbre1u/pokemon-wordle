import { Command } from "commander";

import { buildGameData } from "./utils/buildGameData.js";
import { fetchGameData } from "./utils/fetchGameData.js";

const program = new Command();

program
  .name("pokemon-cli")
  .description("CLI to fetch and build the game data for Pokémon Wordle")
  .version("1.0.0");

program
  .command("fetch")
  .description("Fetches the game data")
  .option(
    "-o, --overwrite",
    "overwrite the game data if they are already written on disk"
  )
  .action(async (options) => {
    await fetchGameData({ overwrite: options.overwrite });
  });

program
  .command("build")
  .description("Builds the game data")
  .option(
    "-f, --fetch",
    "fetch the game data before building if they don't exist"
  )
  .action(async (options) => {
    await buildGameData({ fetch: options.fetch });
  });

program.parse();
