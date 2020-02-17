// / <reference types="Cypress" />

import everyPokemonName from '../../src/pokemon-names.js';
import { getRandomPokemonName } from '../../src/pokemon-names-functions';
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
    cy.get('#pokedex').should('be.visible').get('#pokemon-name').should('not.be.undefined');
  });
  it('verify table is loaded with 10 first pokemons', () => {
    const firstPokemon = capitalize(everyPokemonName[1]);
    const tenthPokemon = capitalize(everyPokemonName[10]);
    const firstPage = '1';
    cy.get('#pokemon-table .pokemon-name').first().should('have.text', firstPokemon);
    cy.get('#pokemon-table .pokemon-name').last().should('have.text', tenthPokemon);
    cy.get('.pagination .active').should('have.text', firstPage);
  });
  it('looks for a random Pokémon and verify it appears in the Pokédex', () => {
    const randomPokemon = capitalize(getRandomPokemonName());
    cy.get('form').then((form$) => {
      form$.on('submit', (e) => {
        e.preventDefault();
      });
    });
    cy.get('#search-pokemon').type(randomPokemon).next().click();
    cy.get('#pokedex #pokemon-name')
      .should('have.text', randomPokemon);
  });
});

// it(`Prueba buscando un pokemon que no existe, y espera que se muestre un error y el campo de input se
//     ponga en rojo`);

// it(`Prueba buscando un pokemon del array con todos los nombres, y espera que se vaya el error y se muestre
//     el pokémon en el pokédex`);

// it('Prueba clickeando en un pokemon de la tabla, y espera que se muestre en el pokédex');

// it('Apreta el botón de random y espera que se cargue un pokemon random');

// it(`Prueba cambiar de página, va, viene, selecciona manualmente. Vuelve a la página 1 y prueba
//     clickeando en Previous cuando está en gris`);
