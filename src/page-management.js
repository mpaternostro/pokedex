function checkInvalidSelection(userSelection) {
  if (userSelection.children[0].classList.contains('disabled') || userSelection.classList.contains('active')) {
    return true;
  }
  return false;
}

function setActivePage(newCurrentPage) {
  $currentPage.classList.remove('active');
  newCurrentPage.classList.add('active');
}

function updateCurrentPage(newCurrentPage) {
  $currentPage = newCurrentPage;
}

function togglePreviousBtnAsDisabled() {
  const $previous = $pagination.children[0];
  $currentPage.textContent === '1' ? $previous.classList.add('disabled') : $previous.classList.remove('disabled');
}

function placePageInTheMiddle() {
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
