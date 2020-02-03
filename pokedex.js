const pokemonStats = {
    $pokemonImage: document.querySelector('img'),
    $pokemonName: document.querySelector('#pokemon-name'),
    $height: document.querySelector('#height'),
    $weight: document.querySelector('#weight'),
    $type: document.querySelector('#type'),
    $baseStats: Array.from(document.querySelectorAll('.base-stats')),
    $baseExperience: document.querySelector('#base-experience')
}

const $input = document.querySelector('#pokemon-tracker input');
const $button = document.querySelector('#pokemon-tracker button');
const $pagination = document.querySelector('.pagination');
let $actualPage = $pagination.children[1];
start();

// BOOTSTRAP NAVBAR
// In the input field, you can look for any pokemon you want. It should give you hints (dunno how).
// Once you click the button, it is shown in the Pokedex.
// If there's no pokemon named after that, an error should be displayed.


$button.addEventListener('click', valorEvento => {
    const inputValue = $input.value;
    showPokemon(inputValue);
    valorEvento.preventDefault();
});

$pagination.addEventListener('click', valorEvento => {
    const $selectedElement = valorEvento.target;
    const $previous = $pagination.children[0];
    const $next = $pagination.children[4];
    if ($selectedElement.classList.contains('disabled') || $selectedElement.parentElement.classList.contains('active')) {
        return;
    }
    if ($selectedElement === $previous) {
        const actualPageNumber = Number($actualPage.textContent) - 1;
        if (actualPageNumber >= 2 && notInTheMiddle($actualPage)) {
            placeInTheMiddle($actualPage);
            listPokemons((actualPageNumber - 1) * 10 + 1);
        }
    }
    if ($selectedElement === $next) {
        const actualPageNumber = Number($actualPage.textContent) + 1;
    }
    $actualPage.classList.remove('active');
    $actualPage = $selectedElement.parentElement;
    console.log($actualPage);
    $actualPage.classList.add('active');
    const actualPageNumber = Number($actualPage.textContent); // from now on, this is the new page number
    if (actualPageNumber >= 2 && notInTheMiddle($actualPage)) {
        placeInTheMiddle($actualPage);
    }
    actualPageNumber !== 1 ? $previous.classList.remove('disabled') : $previous.classList.add('disabled');
    listPokemons((actualPageNumber - 1) * 10 + 1);
});

function placeInTheMiddle(page) {
    const pageNumber = Number(page.textContent);
    const $previous = $pagination.children[0];
    const $leftPage = $pagination.children[1];
    const $rightPage = $pagination.children[3];
    const $next = $pagination.children[4];
    if (page === $rightPage) { // if you selected the page on the right
        $leftPage.children[0].textContent = pageNumber + 1;
        $pagination.insertAdjacentElement('beforeend', $leftPage);
        $pagination.insertAdjacentElement('beforeend', $next);
    } else { // if you selected the page on the left
        $rightPage.children[0].textContent = pageNumber - 1;
        $pagination.insertAdjacentElement('afterbegin', $rightPage);
        $pagination.insertAdjacentElement('afterbegin', $previous);
    }
}

function notInTheMiddle(page) {
    if (page !== $pagination.children[2]) {
        return true;
    } else {
        return false;
    }
}

function start() {
    // randomPokemon();
    listPokemons(1); // Le pasa 1 para que empiece por Bulbasaur
}

function randomPokemon() {
    const randomID = Math.floor(Math.random() * 807);
    const randomPokemonName = everyPokemonName[randomID];
    showPokemon(randomPokemonName);
}

function listPokemons(firstID) {
    const $listOfPokemons = Array.from(document.querySelector("#pokemon-table").children);
    const $pokemonNumbers = Array.from(document.querySelectorAll(".pokemon-number"));
    $pokemonNumbers.forEach((value, i) => {
        value.textContent = firstID + i;
    });
    $listOfPokemons.forEach((value, i) => {
        const cachedPokemon = JSON.parse(localStorage.getItem(`${everyPokemonName[firstID - 1 + i].toLowerCase()}`));
        cachedPokemon ? loadTable(value, cachedPokemon) : addToCacheLoadTable($listOfPokemons[i]);
    });
}

function showPokemon(pokemonToCheck) {
    const pokemonToCheckLowerCase = pokemonToCheck.toLowerCase();
    const cachedPokemon = JSON.parse(localStorage.getItem(pokemonToCheckLowerCase));
    cachedPokemon ? loadPokedex(cachedPokemon) : addToCacheLoadPokedex(pokemonToCheckLowerCase);
}

function addToCacheLoadPokedex(pokemonQuery) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}/`)
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem(`${responseJSON.name}`, setNecessaryItems(responseJSON));
            loadPokedex(responseJSON);
        });
}

function addToCacheLoadTable(pokemonRow) {
    const pokemonID = pokemonRow.children[1].textContent;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem(`${responseJSON.name}`, setNecessaryItems(responseJSON));
            loadTable(pokemonRow, responseJSON);
        });
}

function setNecessaryItems(pokeApiResponse) {
    const necessaryItems = {
        id: pokeApiResponse.id,
        name: pokeApiResponse.name,
        height: pokeApiResponse.height,
        weight: pokeApiResponse.weight,
        types: pokeApiResponse.types,
        stats: pokeApiResponse.stats,
        base_experience: pokeApiResponse.base_experience,
        sprites: pokeApiResponse.sprites
    }
    return JSON.stringify(necessaryItems);
}

function loadPokedex(pokeApiResponse) {
    pokemonStats.$pokemonImage.src = `https://pokeres.bastionbot.org/images/pokemon/${pokeApiResponse.id}.png`
    pokemonStats.$pokemonName.textContent = capitalize(pokeApiResponse.name);
    pokemonStats.$height.textContent = `Height: ${pokeApiResponse.height / 10} m`;
    pokemonStats.$weight.textContent = `Weight: ${pokeApiResponse.weight / 10} kg`;
    pokemonStats.$type.textContent = `Type: ${capitalize(pokeApiResponse.types[0].type.name)}
                            ${pokeApiResponse.types[1] ? capitalize(pokeApiResponse.types[1].type.name) : ''}`;
    pokemonStats.$baseStats.forEach((value, i) => {
        pokemonStats.$baseStats[i].textContent =
            `${capitalize(pokeApiResponse.stats[i].stat.name)}: ${pokeApiResponse.stats[i].base_stat}`;
    });
    pokemonStats.$baseExperience.textContent = `Base Experience: ${pokeApiResponse.base_experience}`;
}

function loadTable(pokemonTableData, pokeApiResponse) {
    const pokemonSprite = pokemonTableData.children[0].children[0];
    const pokemonName = pokemonTableData.children[2];
    const pokemonHP = pokemonTableData.children[3];
    const pokemonATK = pokemonTableData.children[4];
    const pokemonDEF = pokemonTableData.children[5];
    pokemonSprite.src = `${pokeApiResponse.sprites.front_default}`;
    pokemonName.textContent = `${capitalize(pokeApiResponse.name)}`;
    pokemonHP.textContent = `${pokeApiResponse.stats[5].base_stat}`;
    pokemonATK.textContent = `${pokeApiResponse.stats[4].base_stat}`;
    pokemonDEF.textContent = `${pokeApiResponse.stats[3].base_stat}`;
}

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

