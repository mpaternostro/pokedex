import { getPokemons, getRandomPokemon } from './services/pokemon.js';
import { showSpinner } from './utilities/utilities.js';
import loadPokedex from './ui/pokedex.js';
import { loadTable, loadPokedexFromTable } from './ui/table.js';
import handlePaginator from './ui/paginator.js';
import handleNavbarButtons from './ui/navbar.js';

async function handlePokedex(pokemon) {
  loadPokedex(pokemon);
}

async function handleTable(pageNumber = 1) {
  loadTable(await getPokemons(pageNumber));
  handlePaginator(pageNumber, handleTable);
  loadPokedexFromTable(handlePokedex);
}

export default async function start() {
  handlePokedex(await getRandomPokemon());
  showSpinner();
  handleTable();
  handleNavbarButtons(handlePokedex);
}
