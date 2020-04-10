import { checkPageSelection } from '../utilities/utilities.js';

function handleListenersPaginator(callbackFn = () => {}) {
  const $paginator = document.querySelector('#paginator');
  $paginator.addEventListener('click', (event) => {
    const $selectedElement = event.target.parentElement;
    if (checkPageSelection($selectedElement) === true) return false;
    const selectedPageNumber = Number($selectedElement.dataset.page);
    return callbackFn(selectedPageNumber);
  }, { once: true });
}

function updatePaginator(pageNumber = 1) {
  const $paginator = document.querySelector('#paginator');
  const lastPage = 97;
  let leftPage;
  let middlePage;
  let rightPage;
  if (pageNumber === 1) {
    leftPage = pageNumber;
    middlePage = pageNumber + 1;
    rightPage = pageNumber + 2;
  } else if (pageNumber === lastPage) {
    leftPage = pageNumber - 2;
    middlePage = pageNumber - 1;
    rightPage = pageNumber;
  } else {
    leftPage = pageNumber - 1;
    middlePage = pageNumber;
    rightPage = pageNumber + 1;
  }
  const paginatorHTML = `
  <ul class="pagination">
    <li class="page-item ${(pageNumber === 1) && 'disabled'}" data-page=${pageNumber - 1}>
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item ${(leftPage === pageNumber) && 'active'}" data-page=${leftPage}>
      <a class="page-link" href="#">${leftPage}</a>
    </li>
    <li class="page-item ${(middlePage === pageNumber) && 'active'}" data-page=${middlePage}>
      <a class="page-link" href="#">${middlePage}</a>
    </li>
    <li class="page-item ${(rightPage === pageNumber) && 'active'}" data-page=${rightPage}>
      <a class="page-link" href="#">${rightPage}</a>
    </li>
    <li class="page-item" ${(pageNumber === lastPage) && 'disabled'} data-page=${pageNumber + 1}>
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>`;
  $paginator.innerHTML = paginatorHTML;
}

function handlePaginator(pageNumber, callbackFn = () => {}) {
  updatePaginator(pageNumber);
  handleListenersPaginator(callbackFn);
}

export default handlePaginator;
