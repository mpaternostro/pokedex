import { checkInvalidSelection } from './validations.js';

function setActivePage(newCurrentPage) {
  const $currentPage = document.querySelector('.pagination .active');
  $currentPage.classList.remove('active');
  newCurrentPage.classList.add('active');
}

function togglePreviousBtnAsDisabled() {
  const $currentPage = document.querySelector('.pagination .active');
  const $previous = document.querySelector('.pagination').children[0];
  if ($currentPage.textContent === '1') {
    $previous.classList.add('disabled');
  } else {
    $previous.classList.remove('disabled');
  }
}

function placePageInTheMiddle() {
  const $pagination = document.querySelector('.pagination');
  const $currentPage = document.querySelector('.pagination .active');
  if ($currentPage.textContent === '1' || $currentPage === $pagination.children[2]) {
    return;
  }
  const pageNumber = Number($currentPage.textContent);
  const $previous = $pagination.children[0];
  const $leftPage = $pagination.children[1];
  const $rightPage = $pagination.children[3];
  const $next = $pagination.children[4];
  if ($currentPage === $rightPage) {
    $leftPage.children[0].textContent = pageNumber + 1;
    $pagination.insertAdjacentElement('beforeend', $leftPage);
    $pagination.insertAdjacentElement('beforeend', $next);
  } else {
    $rightPage.children[0].textContent = pageNumber - 1;
    $pagination.insertAdjacentElement('afterbegin', $rightPage);
    $pagination.insertAdjacentElement('afterbegin', $previous);
  }
}

export function previous() {
  const $currentPage = document.querySelector('.pagination .active');
  const newCurrentPage = $currentPage.previousElementSibling;
  newCurrentPage.children[0].textContent = Number($currentPage.textContent) - 1;
  setActivePage(newCurrentPage);
  togglePreviousBtnAsDisabled();
  placePageInTheMiddle();
}

export function next() {
  const $currentPage = document.querySelector('.pagination .active');
  const newCurrentPage = $currentPage.nextElementSibling;
  newCurrentPage.children[0].textContent = Number($currentPage.textContent) + 1;
  setActivePage(newCurrentPage);
  togglePreviousBtnAsDisabled();
  placePageInTheMiddle();
}

export function pageSelector(newCurrentPage) {
  setActivePage(newCurrentPage);
  togglePreviousBtnAsDisabled();
  placePageInTheMiddle();
}

export function pageHandler(callbackPageSelector) {
  const $pagination = document.querySelector('.pagination');
  $pagination.addEventListener('click', (valorEvento) => {
    const $selectedElement = valorEvento.target.parentElement;
    if (checkInvalidSelection($selectedElement) === true) {
      return;
    }
    const $previous = $pagination.children[0];
    const $next = $pagination.children[4];
    if ($selectedElement === $previous) {
      previous();
      callbackPageSelector();
      return;
    }
    if ($selectedElement === $next) {
      next();
      callbackPageSelector();
      return;
    }
    pageSelector($selectedElement);
    callbackPageSelector();
  });
  callbackPageSelector();
}
