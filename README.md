# Pokémon Wordle

## Introduction

A game where you have to guess the name of a Pokémon.

Inspired by the game [Wordle](https://www.nytimes.com/games/wordle/index.html).

The game can be played [here](https://demarbre1u.github.io/pokemon-wordle/).

## How to run locally

```bash
git clone git@github.com:demarbre1u/pokemon-wordle.git
cd pokemon-wordle/
npm i
npm run dev
```

## How to update the game data

Use the script `./tools/pokemon-helper.js` as follow :

```bash
pokemon-helper.js [command]

Commands:
  pokemon-helper.js fetch  fetch Pokémon data
  pokemon-helper.js build  build game data

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

```

## Credits

The data used are from the [PokéAPI](https://api-pokemon-fr.vercel.app/).
