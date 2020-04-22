// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import handlePaginator from '../paginator.js';
import { firstPage, tenthPage, eightyFirstPage } from './paginator.fixture.js';

beforeEach(() => {
  document.body.innerHTML = '<nav id="paginator"></nav>';
});

describe('update paginator', () => {
  test('page 1 load as intended', () => {
    handlePaginator(1);
    const $paginator = document.querySelector('#paginator');
    expect($paginator.innerHTML).toMatch(firstPage);
  });

  test('page 10 load as intended', () => {
    handlePaginator(10);
    const $paginator = document.querySelector('#paginator');
    expect($paginator.innerHTML).toMatch(tenthPage);
  });

  test('page 81 load as intended', () => {
    handlePaginator(81);
    const $paginator = document.querySelector('#paginator');
    expect($paginator.innerHTML).toMatch(eightyFirstPage);
  });
});

describe('test callback function after clicking on paginator', () => {
  const callbackFn = jest.fn();
  const pageNumber = 1;

  afterEach(() => callbackFn.mockClear());

  test('click on valid page', () => {
    handlePaginator(pageNumber, callbackFn);
    const $secondPage = document.querySelector('li[data-page="2"]');
    $secondPage.click();
    expect(callbackFn).toHaveBeenCalledWith(2);
  });

  test('click on an invalid page', () => {
    handlePaginator(pageNumber, callbackFn);
    const $previousPage = document.querySelector('li[data-page="0"]');
    $previousPage.click();
    expect(callbackFn).not.toHaveBeenCalled();
  });
});
