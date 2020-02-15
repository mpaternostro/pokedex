import {
  getRandomPokemon, loadPokedex, listPokemons, pageHandler,
} from './ui.js';

function update() {
  // pageHandler();
}

async function start() {
  const randomPokemon = await getRandomPokemon();
  loadPokedex(randomPokemon);
  debugger;
  listPokemons();
}

start();
