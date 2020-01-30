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
// You can change pages, these 20 pokemons are stored on localStorage. You can list pokemon after certain
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

$button.addEventListener('click', () => {
    const inputValue = $input.value;
    showPokemon(inputValue);
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
        console.log('lo tengo en cache papá');
        loadPokemonData(cachedPokemon);
    } else {
        console.log('no estaba en cache, ya te lo traigo');
        addToCacheAndLoad(pokemonToCheckLowerCase);
    }
}

function addToCacheAndLoad(pokemonQuery) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}/`)
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem(`${responseJSON.name}`, JSON.stringify(responseJSON));
            loadPokemonData(responseJSON);
        });
}

function loadPokemonData(pokeApiResponse) {
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

function listPokemons() {
    // List 20 pokemons by pokemon no., they will be listed on the right side of the screen.
}

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

