start();

listPokemons(); // List 20 pokemons by pokemon no., they will be listed on the right side of the screen.
// BOOTSTRAP TABLE
// You can change pages, these 20 pokemons are stored on localStorage. You can list pokemon after certain
// Pokemon no.
// IT IS DONE AUTOMATICALLY. You can click on any of them and it will be shown on the Pokedex.

search(); // In the input field, you can look for any pokemon you want. It should give you hints (dunno how).
// BOOTSTRAP NAVBAR
// Once you click the button, it is shown in the Pokedex.
// If there's no pokemon named after that, an error should be displayed.
// Maybe I could support habitat, color and type pokemon searches.

// const $toggleableBaseStats = document.querySelector('#base-stats');

// $toggleableBaseStats.addEventListener('click', (e) => {
//     console.log('it works');
// });

const pokemonStats = {
    $pokemonImage: document.querySelector('img'),
    $pokemonName: document.querySelector('#pokemon-name'),
    $height: document.querySelector('#height'),
    $weight: document.querySelector('#weight'),
    $baseStats: Array.from(document.querySelectorAll('.base-stats')),
    $baseExperience: document.querySelector('#base-experience')
}

function search() {
    // const $select = document.querySelector('select');
    const $input = document.querySelector('#pokemon-tracker input');
    const $button = document.querySelector('#pokemon-tracker button');
    // const $list = document.querySelector('ol');

    // $select.addEventListener('change', (e) => {
    //     return valueToLookFor = e.target.value.toLowerCase().split(' ').join('-');
    // });
    $button.addEventListener('click', () => {
        const inputValue = $input.value.toLowerCase();
        // const objectToSearchFor = `${valueToLookFor}-${inputValue}`;
        const cachedObject = JSON.parse(localStorage.getItem(inputValue));
        if (cachedObject) {
            console.log('lo tengo en cache papá', cachedObject);
            // pokemonStats.$pokemonImage.src = `https://pokeres.bastionbot.org/images/pokemon/${cachedObject.id}.png`
            // pokemonStats.$pokemonName.textContent = capitalize(cachedObject.name);
            // pokemonStats.$height.textContent = `Height: ${cachedObject.height}`;
            // pokemonStats.$weight.textContent = `Weight: ${cachedObject.weight}`;
            // pokemonStats.$baseStats.forEach((value, i) => {
            //     pokemonStats.$baseStats[i].textContent =
            //         `${capitalize(cachedObject.stats[i].stat.name)}: ${cachedObject.stats[i].base_stat}`;
            // });
            // pokemonStats.$baseExperience.textContent = `Base Experience: ${cachedObject.base_experience}`;
            loadPokemonData(cachedObject);
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}/`)
                .then(response => response.json())
                .then(responseJSON => {
                    console.log('no estaba en cache, ya te lo traigo', responseJSON)
                    localStorage.setItem(`${responseJSON.id}`, JSON.stringify(responseJSON));
                    loadPokemonData(responseJSON);
                });
        }
    });
}

function start() {
    const randomPokemonID = 10;
    randomPokemon(randomPokemonID);
    listPokemons();
}

function randomPokemon() {

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

}

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

