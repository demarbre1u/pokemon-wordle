#!/usr/bin/env node

import fs from "fs";
import { join } from "path";
import process from "process";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { fetchData } from "./utils/fetchData.js";
import { buildGameData } from "./utils/buildGameData.js";
import { prompt } from "./utils/prompt.js";

const pokemonDataPath = join("..", "public", "pokemon-data.json");

yargs(hideBin(process.argv))
  .command("fetch", "fetch Pokémon data", async () => {
    if (fs.existsSync(pokemonDataPath)) {
      prompt(
        `"${pokemonDataPath}" already exists, so fetching data would override it.\nWould you like to proceed anyway (Y/n) ?`,
        async (answer) => {
          if (!["", "y", "Y"].includes(answer)) {
            process.exit(0);
          }

          await fetchData();
        }
      );
    } else {
      await fetchData();
    }
  })
  .command("build", "build game data", async () => {
    if (!fs.existsSync(pokemonDataPath)) {
      prompt(
        `No game data has been found. \nWould you like to fetch it first? (Y/n) ?`,
        async (answer) => {
          if (!["", "y", "Y"].includes(answer)) {
            process.exit(0);
          }

          await fetchData();
          await buildGameData();
        }
      );
    } else {
      await buildGameData();
    }
  })
  .parse();
