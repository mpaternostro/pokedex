export function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1); }

export function checkPageSelection(userSelection) {
  if (userSelection.children[0].classList.contains('disabled') || userSelection.classList.contains('active')) {
    return true;
  }
  return false;
}

export function waitImageLoad(URL) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = URL;
  });
}

export function showSpinner() {
  const $pokedex = document.querySelector('#pokedex');
  const spinner = `
      <div class="d-flex justify-content-center align-items-center flex-grow-1" id="spinner">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>`;
  $pokedex.innerHTML = spinner;
}

export function toggleInputError(behavior) {
  const $nameError = document.querySelector('#name-error');
  if ($nameError) $nameError.remove();
  const $searchPokemon = document.querySelector('#search-pokemon');
  const $searchInput = $searchPokemon.querySelector('input');
  const error = `
      <div id="name-error" class="alert-danger form-control mr-2" role="alert">
        Pokémon not found in database
      </div>`;
  if (behavior === 'hide') $searchInput.classList.remove('alert-danger');
  if (behavior === 'show') {
    $searchPokemon.insertAdjacentHTML('afterbegin', error);
    $searchInput.classList.add('alert-danger');
  }
}
