import Pokemon from '../entities/Pokemon.js';
import { checkCurrentPokemon } from '../utilities/check-input.js';
import { capitalize, showSpinner } from '../utilities/utilities.js';
import { getPokemon } from '../services/pokemon.js';

export function loadTable(pokemonList: Pokemon[]) {
  const table = document.querySelector('#pokemon-table') as HTMLTableSectionElement;
  let everyRow = '';
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
    everyRow += row;
  });
  table.innerHTML = everyRow;
}

type CallbackFunction = (pokemon: Pokemon) => void;

async function handleRowListener(row: HTMLTableRowElement, callbackFn: CallbackFunction) {
  const cell = row.querySelector('.pokemon-name') as HTMLTableCellElement;
  const { pokemonName } = cell.dataset;
  if (!pokemonName) {
    return;
  }
  if (checkCurrentPokemon(pokemonName)) {
    return;
  }
  showSpinner();
  const pokemon = await getPokemon(pokemonName);
  callbackFn(pokemon);
}

export function loadPokedexFromTable(callbackFn: CallbackFunction) {
  const $pokemonTable = document.querySelector('#pokemon-table') as HTMLTableSectionElement;
  const tableRows = Array.from($pokemonTable.children) as HTMLTableRowElement[];
  tableRows.forEach((tr) => {
    tr.addEventListener('click', () => handleRowListener(tr, callbackFn));
    tr.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        handleRowListener(tr, callbackFn);
      }
    });
  });
}
