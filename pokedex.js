const pokemonStats = {
    $pokemonImage: document.querySelector('img'),
    $pokemonName: document.querySelector('#pokemon-name'),
    $height: document.querySelector('#height'),
    $weight: document.querySelector('#weight'),
    $type: document.querySelector('#type'),
    $baseStats: Array.from(document.querySelectorAll('.base-stats')),
    $baseExperience: document.querySelector('#base-experience')
}

const $homeButton = document.querySelector('#home-button');
const $randomButton = document.querySelector('#random-button');
const $searchInput = document.querySelector('#pokemon-tracker input');
const $searchButton = document.querySelector('#pokemon-tracker button');
const $pagination = document.querySelector('.pagination');
let $actualPage = $pagination.children[1];
start();

// BOOTSTRAP NAVBAR
// If there's no pokemon named after that, an error should be displayed.

$homeButton.addEventListener('click', () => {
    window.location.reload();
});

$randomButton.addEventListener('click', () => {
    randomPokemon();
});

$searchButton.addEventListener('click', valorEvento => {
    const inputValue = $searchInput.value;
    if (validatePokemon(inputValue) === true) {
        showPokemon(inputValue);
    }
    valorEvento.preventDefault();
});

$pagination.addEventListener('click', valorEvento => {
    const $selectedElement = valorEvento.target.parentElement;
    const $previous = $pagination.children[0];
    const $next = $pagination.children[4];

    if (checkInvalidSelection($selectedElement) === true) {
        return;
    }
    if ($selectedElement === $previous) {
        previous();
        return;
    }
    if ($selectedElement === $next) {
        next();
        return;
    }
    pageSelector($selectedElement);
});

function start() {
    randomPokemon();
    listPokemons(1);
}

function randomPokemon() {
    const randomID = Math.floor(Math.random() * 807);
    const randomPokemonName = everyPokemonName[randomID];
    showPokemon(randomPokemonName);
}

function listPokemons() {
    const $pokemonNumbers = Array.from(document.querySelectorAll(".pokemon-number"));
    const $listOfPokemons = Array.from(document.querySelector("#pokemon-table").children);
    const actualPageNumber = Number($actualPage.textContent);
    const firstID = (actualPageNumber - 1) * 10 + 1;
    $pokemonNumbers.forEach((value, i) => {
        value.textContent = firstID + i;
    });
    $listOfPokemons.forEach((value, i) => {
        const cachedPokemon = JSON.parse(localStorage.getItem(`${everyPokemonName[firstID - 1 + i].toLowerCase()}`));
        cachedPokemon ? loadTable(value, cachedPokemon) : addToCacheLoadTable($listOfPokemons[i]);
    });
}

function checkInvalidSelection(userSelection) {
    if (userSelection.children[0].classList.contains('disabled') || userSelection.classList.contains('active')) {
        return true;
    } else {
        return false;
    }
}

function previous() {
    const newActualPage = $actualPage.previousElementSibling;
    newActualPage.children[0].textContent = Number($actualPage.textContent) - 1;
    showAsActive(newActualPage);
    updateActualPage(newActualPage);
    toggleDisabled();
    placeInTheMiddle();
    listPokemons();
}

function next() {
    const newActualPage = $actualPage.nextElementSibling;
    newActualPage.children[0].textContent = Number($actualPage.textContent) + 1;
    showAsActive(newActualPage);
    updateActualPage(newActualPage);
    toggleDisabled();
    placeInTheMiddle();
    listPokemons();
}

function pageSelector(newActualPage) {
    showAsActive(newActualPage);
    updateActualPage(newActualPage);
    toggleDisabled();
    placeInTheMiddle();
    listPokemons();
}

function toggleDisabled() {
    const $previous = $pagination.children[0];
    $actualPage.textContent === '1' ? $previous.classList.add('disabled') : $previous.classList.remove('disabled');
}

function updateActualPage(newActualPage) {
    $actualPage = newActualPage;
}

function showAsActive(newActualpage) {
    $actualPage.classList.remove('active');
    newActualpage.classList.add('active');
}

function placeInTheMiddle() {
    if ($actualPage.textContent === '1' || $actualPage === $pagination.children[2]) {
        return;
    }
    const pageNumber = Number($actualPage.textContent);
    const $previous = $pagination.children[0];
    const $leftPage = $pagination.children[1];
    const $rightPage = $pagination.children[3];
    const $next = $pagination.children[4];
    if ($actualPage === $rightPage) {
        $leftPage.children[0].textContent = pageNumber + 1;
        $pagination.insertAdjacentElement('beforeend', $leftPage);
        $pagination.insertAdjacentElement('beforeend', $next);
    } else {
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

function validatePokemon(pokemon) {
    if (everyPokemonName.includes(capitalize(pokemon.toLowerCase()))) {
        toggleInputError('hide');
        return true;
    } else {
        toggleInputError('show');
    }
}

function showPokemon(pokemonToCheck) {
    const pokemonToCheckLowerCase = pokemonToCheck.toLowerCase();
    const cachedPokemon = JSON.parse(localStorage.getItem(pokemonToCheckLowerCase));
    cachedPokemon ? loadPokedex(cachedPokemon) : addToCacheLoadPokedex(pokemonToCheckLowerCase);
}

function addToCacheLoadPokedex(pokemonQuery) {
    toggleSpinner('hide', 'pokedex');
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}/`)
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem(`${responseJSON.name}`, setNecessaryItems(responseJSON));
            loadPokedex(responseJSON);
        })
        .catch(error => console.error("LA API NO ENCONTRÓ ESTE POKEMON", error));
}

function addToCacheLoadTable(pokemonRow) {
    const pokemonID = pokemonRow.children[1].textContent;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
        .then(response => response.json())
        .then(responseJSON => {
            localStorage.setItem(`${responseJSON.name}`, setNecessaryItems(responseJSON));
            loadTable(pokemonRow, responseJSON);
        })
        .catch(error => console.error("LA API NO ENCONTRÓ ESTE POKEMON", error));
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
        sprites: pokeApiResponse.sprites.front_default
    }
    return JSON.stringify(necessaryItems);
}

function loadPokedex(pokeInfoObject) {
    waitImageLoad(`https://pokeres.bastionbot.org/images/pokemon/${pokeInfoObject.id}.png`)
        .then(image => {
            pokemonStats.$pokemonImage.src = image.src;
            pokemonStats.$pokemonName.textContent = `${capitalize(pokeInfoObject.name)} [${[pokeInfoObject.id]}]`;
            pokemonStats.$height.textContent = `Height: ${pokeInfoObject.height / 10} m`;
            pokemonStats.$weight.textContent = `Weight: ${pokeInfoObject.weight / 10} kg`;
            pokemonStats.$type.textContent = `Type: ${capitalize(pokeInfoObject.types[0].type.name)}
                ${pokeInfoObject.types[1] ? capitalize(pokeInfoObject.types[1].type.name) : ''}`;
            pokemonStats.$baseStats.forEach((value, i) => {
                value.textContent = `${capitalize(pokeInfoObject.stats[i].stat.name)}: ${pokeInfoObject.stats[i].base_stat}`;
            });
            pokemonStats.$baseExperience.textContent = `Base Experience: ${pokeInfoObject.base_experience}`;
            toggleSpinner('show', 'pokedex');
        })
        .catch(error => console.error("NO PUDE CARGAR LA IMAGEN", error));
}

function loadTable(pokemonTableData, pokeInfoObject) {
    const pokemonSprite = pokemonTableData.children[0].children[0];
    const pokemonName = pokemonTableData.children[2];
    const pokemonHP = pokemonTableData.children[3];
    const pokemonATK = pokemonTableData.children[4];
    const pokemonDEF = pokemonTableData.children[5];
    if (pokeInfoObject.sprites.front_default) {
        pokemonSprite.src = `${pokeInfoObject.sprites.front_default}`;
    } else {
        pokemonSprite.src = `${pokeInfoObject.sprites}`;
    }
    pokemonName.textContent = `${capitalize(pokeInfoObject.name)}`;
    pokemonHP.textContent = `${pokeInfoObject.stats[5].base_stat}`;
    pokemonATK.textContent = `${pokeInfoObject.stats[4].base_stat}`;
    pokemonDEF.textContent = `${pokeInfoObject.stats[3].base_stat}`;
}

function waitImageLoad(URL) {
    toggleSpinner('hide', 'pokedex');
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", err => reject(err));
        img.src = URL;
    });
}

function toggleSpinner(behavior, relative) {
    const $spinner = document.querySelector(`#spinner-${relative}`);
    const $relative = document.querySelector(`#${relative}`);
    if (behavior === 'show') {
        $spinner.classList.remove('d-flex');
        $spinner.classList.add('d-none');
        $relative.classList.remove('d-none');
        $relative.classList.add('d-flex');
    }
    if (behavior === 'hide') {
        $relative.classList.remove('d-flex');
        $relative.classList.add('d-none');
        $spinner.classList.remove('d-none');
        $spinner.classList.add('d-flex');
    }
}

function toggleInputError(behavior) {
    const $nameError = document.querySelector('#name-error');
    if (behavior === 'hide') {
        $nameError.classList.add('d-none');
        $searchInput.classList.remove('alert-danger');
    }
    if (behavior === 'show') {
        $nameError.classList.remove('d-none');
        $searchInput.classList.add('alert-danger');
    }
}

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

