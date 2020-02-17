import {
  loadPokedex, loadPokedexFromTable, loadTable, handleButtons,
} from './ui.js';

import { pageHandler } from './page-management.js';

import { getRandomPokemon, arrPokemonsData } from './pokemon-names-functions.js';

async function updatePokedex(pokemon) {
  loadPokedex(pokemon);
}

async function updateTable() {
  loadTable(await arrPokemonsData());
}

async function start() {
  updatePokedex(await getRandomPokemon());
  pageHandler(updateTable);
  handleButtons(updatePokedex);
  loadPokedexFromTable(updatePokedex);
}

start();
