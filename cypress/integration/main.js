// / <reference types="Cypress" />

import everyPokemonName from '../../src/pokemon-names.js';
import { getRandomPokemonName } from '../../src/pokemon-names-functions.js';
import { capitalize } from '../../src/ui.js';

const URL = 'http://127.0.0.1:8080';

describe('Poké Test', () => {
  it('successfully loads', () => {
    cy.visit(URL);
  });
  it('checks for spinner to appear', () => {
    cy.get('#spinner').should('be.visible');
  });
  it('wait until a random Pokémon is loaded on the Pokédex', () => {
    cy.get('#pokedex').should('be.visible')
      .get('#pokemon-name')
      .should('not.be.undefined');
  });
  it('clicks on "random" button and waits till a random pokemon is shown in the pokedex', () => {
    cy.get('#pokedex #pokemon-name').then(($name) => {
      cy.get('#random-button').click()
        .get('#pokedex #pokemon-name')
        .should('not.have.text', $name[0].textContent);
    });
  });
  const randomPokemon = capitalize(getRandomPokemonName());
  it('looks for a random Pokémon and verify it appears in the Pokédex', () => {
    cy.get('form').then((form$) => {
      form$.on('submit', (e) => {
        e.preventDefault();
      });
    });
    cy.get('#search-pokemon').type(randomPokemon)
      .next()
      .click();
    cy.get('#pokedex #pokemon-name')
      .should('have.text', randomPokemon);
  });
  it('looks for a non existent Pokemon and waits for an error to appear: input should be red and Pokedex should still show last pokemon searched', () => {
    cy.get('form').then((form$) => {
      form$.on('submit', (e) => {
        e.preventDefault();
      });
    });
    cy.get('#search-pokemon').clear()
      .type('pikachumon')
      .next()
      .click();
    cy.get('#pokedex #pokemon-name')
      .should('have.text', randomPokemon);
    cy.get('#name-error').should('be.visible');
    cy.get('#search-pokemon').should('have.class', 'alert-danger');
  });
  const newRandomPokemon = capitalize(getRandomPokemonName());
  it('looks for a random Pokémon and verify it appears in the Pokédex, errors should have disappeared', () => {
    cy.get('form').then((form$) => {
      form$.on('submit', (e) => {
        e.preventDefault();
      });
    });
    cy.get('#search-pokemon').clear()
      .type(newRandomPokemon)
      .next()
      .click();
    cy.get('#pokedex #pokemon-name')
      .should('have.text', newRandomPokemon);
    cy.get('#name-error').should('not.be.visible');
    cy.get('#search-pokemon').should('not.have.class', 'alert-danger');
  });
  it('verify table is loaded with 10 first pokemons', () => {
    const firstPokemon = capitalize(everyPokemonName[1]);
    const tenthPokemon = capitalize(everyPokemonName[10]);
    const firstPage = '1';
    cy.get('#pokemon-table .pokemon-name').first()
      .should('have.text', firstPokemon);
    cy.get('#pokemon-table .pokemon-name').last()
      .should('have.text', tenthPokemon);
    cy.get('.pagination .active').should('have.text', firstPage);
  });
  it('clicks on a pokemon from the table and waits till it is shown in the pokedex', () => {
    const seventhPokemon = capitalize(everyPokemonName[7]);
    cy.get('#pokemon-table .pokemon-name').eq(6)
      .click();
    cy.get('#pokedex #pokemon-name').should('have.text', seventhPokemon);
  });
  it('change table\'s pages, then return to page 1 and tries to click on previous button (it should be greyed out)', () => {
    /* eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 10 }] */
    cy.get('.pagination').children().eq(3).click().parent().children().eq(1).click().parent().children()
      .eq(0)
      .click()
      .should('have.class', 'disabled');
  });
});
