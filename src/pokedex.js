const pokemonStats = {
  $pokemonImage: document.querySelector('img'),
  $pokemonName: document.querySelector('#pokemon-name'),
  $pokemonID: document.querySelector('#pokemon-id'),
  $height: document.querySelector('#height'),
  $weight: document.querySelector('#weight'),
  $type: document.querySelector('#type'),
  $baseStats: Array.from(document.querySelectorAll('.base-stats')),
  $baseExperience: document.querySelector('#base-experience'),
};

const $homeButton = document.querySelector('#home-button');
const $randomButton = document.querySelector('#random-button');
const $searchInput = document.querySelector('#pokemon-tracker input');
const $searchButton = document.querySelector('#pokemon-tracker button');
const $pagination = document.querySelector('.pagination');
const $pokemonTable = document.querySelector('#pokemon-table');
const $currentPage = $pagination.children[1];

function previous() {
  const newCurrentPage = $currentPage.previousElementSibling;
  newCurrentPage.children[0].textContent = Number($currentPage.textContent) - 1;
  setActivePage(newCurrentPage);
  updateCurrentPage(newCurrentPage);
  togglePreviousBtnAsDisabled();
  placePageInTheMiddle();
  listPokemons();
}

function next() {
  const newCurrentPage = $currentPage.nextElementSibling;
  newCurrentPage.children[0].textContent = Number($currentPage.textContent) + 1;
  setActivePage(newCurrentPage);
  updateCurrentPage(newCurrentPage);
  togglePreviousBtnAsDisabled();
  placePageInTheMiddle();
  listPokemons();
}

function pageSelector(newCurrentPage) {
  setActivePage(newCurrentPage);
  updateCurrentPage(newCurrentPage);
  togglePreviousBtnAsDisabled();
  placePageInTheMiddle();
  listPokemons();
}

$homeButton.addEventListener('click', () => {
  window.location.reload();
});

$randomButton.addEventListener('click', () => {
  loadRandomPokemon();
});

$searchButton.addEventListener('click', (valorEvento) => {
  const inputValue = $searchInput.value;
  getPokemon(inputValue);
  valorEvento.preventDefault();
});

Array.from($pokemonTable.children).forEach((value) => {
  value.addEventListener('click', () => {
    getPokemon(value.children[2].textContent);
  });
});

$pagination.addEventListener('click', (valorEvento) => {
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
