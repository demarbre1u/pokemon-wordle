import ASCIIFolder from "fold-to-ascii";
import fs from "fs";
import { join } from "path";

function getTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  var dateTime = hour + ":" + minute + ":" + second;
  return dateTime;
}

const logger = {
  log: (messsage, severity = "INFO") => {
    const currentTime = getTime();
    console.log(`[${currentTime}] [${severity}] ${messsage}`);
  },
};
async function buildDictionnary() {
  logger.log("Fetching data...");
  const data = await fetchData();
  logger.log("Data fetched successfully");

  const lengthList = {};
  const pokemonNameList = [];

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
      filename: "pokemon-data.json",
      data,
    },
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

    logger.log(`[ ${i + 1} / ${dataToWrite.length} ] Writing "${filename}"...`);
    const outputPath = join("public", filename);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    logger.log(
      `[ ${i + 1} / ${dataToWrite.length} ] Data written to "${outputPath}"`
    );
  }
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
