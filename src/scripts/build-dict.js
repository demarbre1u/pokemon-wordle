import ASCIIFolder from "fold-to-ascii";

async function buildDictionnary() {
  const data = await fetchData();

  for (let row of data) {
    let name = row.name.fr;

    // Removing accents
    name = ASCIIFolder.foldReplacing(name);
    name = name.toLowerCase();

    if (!name.match(/^[a-z]+$/)) {
      console.log(name, "is not valid");
    }
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
