const $homeButton = document.querySelector('#home-button');
const $randomButton = document.querySelector('#random-button');
const $searchInput = document.querySelector('#pokemon-tracker input');
const $searchButton = document.querySelector('#pokemon-tracker button');
const $pagination = document.querySelector('.pagination');
const $pokemonTable = document.querySelector('#pokemon-table');
const $currentPage = $pagination.children[1];

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
