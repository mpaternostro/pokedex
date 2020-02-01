const pokemonStats = {
    $pokemonImage: document.querySelector('img'),
    $pokemonName: document.querySelector('#pokemon-name'),
    $height: document.querySelector('#height'),
    $weight: document.querySelector('#weight'),
    $baseStats: Array.from(document.querySelectorAll('.base-stats')),
    $baseExperience: document.querySelector('#base-experience')
}

const $input = document.querySelector('#pokemon-tracker input');
const $button = document.querySelector('#pokemon-tracker button');

start();

// BOOTSTRAP TABLE
// You can change pages, these 10 pokemons are stored on localStorage. You can list pokemon after certain
// Pokemon no.
// IT IS DONE AUTOMATICALLY. You can click on any of them and it will be shown on the Pokedex.

// BOOTSTRAP NAVBAR
// In the input field, you can look for any pokemon you want. It should give you hints (dunno how).
// Once you click the button, it is shown in the Pokedex.
// If there's no pokemon named after that, an error should be displayed.
// Maybe I could support habitat, color and type pokemon searches.

function start() {
    // randomPokemon();
    listPokemons();
}

$button.addEventListener('click', (valorEvento) => {
    const inputValue = $input.value;
    showPokemon(inputValue);
    valorEvento.preventDefault();
});

function randomPokemon() {
    const randomID = Math.floor(Math.random() * 807);
    const randomPokemonName = everyPokemonName[randomID];
    showPokemon(randomPokemonName);
}

function showPokemon(pokemonToCheck) {
    const pokemonToCheckLowerCase = pokemonToCheck.toLowerCase();
    const cachedPokemon = JSON.parse(localStorage.getItem(pokemonToCheckLowerCase));
    if (cachedPokemon) {
        loadPokedex(cachedPokemon);
    } else {
        addToCacheLoadPokedex(pokemonToCheckLowerCase);
    }
}

function addToCacheLoadPokedex(pokemonQuery) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}/`)
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem(`${responseJSON.name}`, JSON.stringify(responseJSON));
            loadPokedex(responseJSON);
        });
}

function addToCacheLoadTable(pokemonRow) {
    const pokemonID = pokemonRow.children[1].textContent;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem(`${responseJSON.name}`, JSON.stringify(responseJSON));
            loadTable(pokemonRow, responseJSON);
        });
}

function loadPokedex(pokeApiResponse) {
    pokemonStats.$pokemonImage.src = `https://pokeres.bastionbot.org/images/pokemon/${pokeApiResponse.id}.png`
    pokemonStats.$pokemonName.textContent = capitalize(pokeApiResponse.name);
    pokemonStats.$height.textContent = `Height: ${pokeApiResponse.height}`;
    pokemonStats.$weight.textContent = `Weight: ${pokeApiResponse.weight}`;
    pokemonStats.$baseStats.forEach((value, i) => {
        pokemonStats.$baseStats[i].textContent =
            `${capitalize(pokeApiResponse.stats[i].stat.name)}: ${pokeApiResponse.stats[i].base_stat}`;
    });
    pokemonStats.$baseExperience.textContent = `Base Experience: ${pokeApiResponse.base_experience}`;
}

function loadTable(pokemonData, pokeApiResponse) {
    const pokemonSprite = pokemonData.children[0];
    pokemonSprite.
}

function listPokemons() {
    const $listOfPokemons = Array.from(document.querySelector("#pokemon-table").children);
    $listOfPokemons.forEach((value, i) => {
        addToCacheLoadTable($listOfPokemons[i]);
    });
}

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

