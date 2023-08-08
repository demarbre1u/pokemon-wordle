import ASCIIFolder from "fold-to-ascii";
import fs from "fs";
import { join } from "path";

async function buildDictionnary() {
  console.log("Fetching data...");
  const data = await fetchData();
  console.log("Data fetched successfully");

  const pokemonNameList = [];

  console.log("Parsing data...");
  for (let row of data) {
    let name = row.name.fr;

    // Removing accents
    name = ASCIIFolder.foldReplacing(name);
    name = name.toLowerCase();

    if (!name.match(/^[a-z]+$/)) {
      console.log(name, "is not valid, skipped");
      continue;
    }

    pokemonNameList.push(name);
  }
  console.log("Data parsed");

  console.log("Writing data...");
  const outputPath = join("src", "assets", "pokemon-names.json");
  fs.writeFileSync(outputPath, JSON.stringify(pokemonNameList, null, 2));
  console.log("Data written to :", outputPath);
}

async function fetchData() {
  const result = await fetch(
    "https://api-pokemon-fr.vercel.app/api/v1/pokemon"
  );

  if (result.ok) {
    return await result.json();
  } else {
    throw new Error(await result.text());
  }
}

buildDictionnary();
