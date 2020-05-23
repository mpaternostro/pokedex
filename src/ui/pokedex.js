import { capitalize, waitImageLoad } from '../utilities/utilities.js';

async function loadPokedex(pokemon) {
  const image = await waitImageLoad(`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`)
    .catch((error) => {
      throw new Error('COULD NOT GET POKEMON PICTURE', error);
    });
  const pokedex = document.querySelector('#pokedex');
  const typeOne = pokemon.types[0].type.name;
  let typeTwo;
  if (pokemon.types[1]) typeTwo = pokemon.types[1].type.name;
  const pokemonHTML = `
    <div class="media">
      <img src="${image.src}" class="mr-3" id="pokedex-image" alt="pokemon-image" />
      <div class="media-body">
        <h5 class="mt-0">
          <strong id="pokemon-name" data-pokemon-name="${pokemon.name}">${capitalize(pokemon.name)}</strong>
          <strong id="pokemon-id" data-pokemon-id="${pokemon.id}">[${pokemon.id}]</strong>
        </h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Height: ${pokemon.height / 10} m</li>
          <li class="list-group-item">Weight: ${pokemon.weight / 10} kg</li>
          <li class="list-group-item">Type:
            <span class="type ${typeOne} rounded-pill p-1">${capitalize(typeOne)}</span>
            ${typeTwo !== undefined ? `<span class="type ${typeTwo} rounded-pill p-1">${capitalize(typeTwo)}</span>` : ''}
          </li>
          <br/>
          <ul class="list-group list-group-flush">
            <strong>Base Stats</strong>
            <li class="list-group-item">${capitalize(pokemon.stats[0].stat.name)}: ${pokemon.stats[0].base_stat}</li>
            <li class="list-group-item">${capitalize(pokemon.stats[1].stat.name)}: ${pokemon.stats[1].base_stat}</li>
            <li class="list-group-item">${capitalize(pokemon.stats[2].stat.name)}: ${pokemon.stats[2].base_stat}</li>
            <li class="list-group-item">${capitalize(pokemon.stats[3].stat.name)}: ${pokemon.stats[3].base_stat}</li>
            <li class="list-group-item">${capitalize(pokemon.stats[4].stat.name)}: ${pokemon.stats[4].base_stat}</li>
            <li class="list-group-item">${capitalize(pokemon.stats[5].stat.name)}: ${pokemon.stats[5].base_stat}</li>
            <li class="list-group-item">Base Experience: ${pokemon.baseExperience}</li>
          </ul>
        </ul>
      </div>
    </div>`;
  pokedex.innerHTML = pokemonHTML;
}

export default loadPokedex;
