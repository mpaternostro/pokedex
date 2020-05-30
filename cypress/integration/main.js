/* eslint-disable jest/expect-expect */
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('Poké Test', () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });

    cy.server();
    cy.route(/https:\/\/pokeapi.co\/api\/v2\/pokemon\/\w+\//, 'fixture:bulbasaur')
      .as('getPokemonData');
    cy.route(/https:\/\/pokeapi.co\/api\/v2\/pokemon\/[a-z]+-[a-z]*\//, 'fixture:bulbasaur')
      .as('getPokemonData');
    cy.route('https://pokeapi.co/api/v2/pokemon/charmander', 'fixture:charmander')
      .as('getPokemonData');
    cy.route('https://pokeapi.co/api/v2/pokemon/caterpie', 'fixture:caterpie')
      .as('getPokemonData');

    cy.visit('http://127.0.0.1:8080', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  it('verify table is loaded with 10 pokemons', () => {
    const firstPage = '1';
    cy.get('#pokemon-table .pokemon-name').first()
      .should('have.text', 'Bulbasaur');
    cy.get('#pokemon-table .pokemon-name').last()
      .should('have.text', 'Caterpie');
    cy.get('#pokemon-table .pokemon-name').should('have.length', 10);
    cy.get('.pagination .active').should('contain', firstPage);
  });

  it('bulbasaur is loaded on the Pokédex', () => {
    cy.get('#pokedex').should('be.visible')
      .get('#pokemon-name').should('have.text', 'Bulbasaur');
  });

  it('clicks on "random" button, spinner should appear and then bulbasaur should be shown again in the pokedex', () => {
    cy.server();
    cy.route(/https:\/\/pokeapi.co\/api\/v2\/pokemon\/\w+\//, 'fixture:bulbasaur')
      .as('getPokemonData');

    cy.get('#random-button').click();
    cy.get('#spinner').should('be.visible');
    cy.get('#pokedex #pokemon-name').should('have.text', 'Bulbasaur');
  });

  it('looks for a Pokémon and verify it appears in the Pokédex', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/charmander', 'fixture:charmander')
      .as('getPokemonData');

    cy.get('#search-pokemon').type('Charmander');
    cy.get('form button').click();
    cy.get('#pokedex #pokemon-name')
      .should('have.text', 'Charmander');
  });

  it('looks for a non existent Pokemon and waits for an error to appear: input should be red and Pokedex should still show last pokemon searched', () => {
    cy.get('form input').clear()
      .type('asdasdasdasdasd')
      .next()
      .click();
    cy.get('#pokedex #pokemon-name')
      .should('have.text', 'Charmander');
    cy.get('#name-error').should('be.visible');
    cy.get('form input').should('have.class', 'alert-danger');
  });

  it('looks for pokemon and verifies that it appears in the Pokédex, errors should have disappeared', () => {
    cy.server();
    cy.route('https://pokeapi.co/api/v2/pokemon/caterpie', 'fixture:caterpie')
      .as('getPokemonData');

    cy.get('form input').clear()
      .type('caterpie')
      .next()
      .click();
    cy.get('#pokedex #pokemon-name')
      .should('have.text', 'Caterpie');
    cy.get('#name-error').should('not.be.visible');
    cy.get('#search-pokemon').should('not.have.class', 'alert-danger');
  });

  it('clicks on a pokemon from the table and waits till it is shown in the pokedex', () => {
    cy.get('#pokemon-table .pokemon-name').eq(3)
      .click();
    cy.get('#pokedex #pokemon-name').should('have.text', 'Charmander');
  });
});
