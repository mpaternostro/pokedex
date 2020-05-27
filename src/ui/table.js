import { checkCurrentPokemon } from '../utilities/check-input.js';
import { capitalize, showSpinner } from '../utilities/utilities.js';
import { getPokemon } from '../services/pokemon.js';

export function loadTable(pokemonList) {
  const table = document.querySelector('#pokemon-table');
  let everyRow;
  pokemonList.forEach((pokemon) => {
    const row = `
      <tr tabindex="0" role="button">
        <td class="pokemon-sprite text-center p-0"><img src="${pokemon.sprite}" alt="table-sprite"/></td>
        <th scope="row" class="pokemon-id" data-id="${pokemon.id}">${pokemon.id}</th>
        <td class="pokemon-name" data-pokemon-name="${pokemon.name}">${capitalize(pokemon.name)}</td>
        <td class="pokemon-hp">${pokemon.stats[5].value}</td>
        <td class="pokemon-atk">${pokemon.stats[4].value}</td>
        <td class="pokemon-def">${pokemon.stats[3].value}</td>
      </tr>`;
    everyRow = (everyRow ? everyRow += row : row);
  });
  table.innerHTML = everyRow;
}

async function handleRowListener(row, callbackFn) {
  const { pokemonName } = row.children[2].dataset;
  if (checkCurrentPokemon(pokemonName) === true) return;
  showSpinner();
  const pokemon = await getPokemon(pokemonName);
  callbackFn(pokemon);
}

export function loadPokedexFromTable(callbackFn = () => {}) {
  const $pokemonTable = document.querySelector('#pokemon-table');
  Array.from($pokemonTable.children).forEach((value) => {
    value.addEventListener('click', () => handleRowListener(value, callbackFn));
    value.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') handleRowListener(value, callbackFn);
    });
  });
}
