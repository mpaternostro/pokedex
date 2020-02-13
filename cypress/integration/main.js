/// <reference types="Cypress" />

const URL = 'http://127.0.0.1:8080';

describe('Pokédex Test', () => {
    before(() => {
        cy.visit(URL);
    })
});

it('Checks for the spinner to appear and wait until a random Pokémon is loaded on the Pokédex', () => {

});

it(`Chequea que aparezca la tabla y se cargue con los 10 primeros pokemones`)

it(`Prueba buscando un pokemon del array con todos los nombres, y espera que se muestre en el pokédex`)

it(`Prueba buscando un pokemon que no existe, y espera que se muestre un error y el campo de input se 
    ponga en rojo`)

it(`Prueba buscando un pokemon del array con todos los nombres, y espera que se vaya el error y se muestre
    el pokémon en el pokédex`)

it(`Prueba clickeando en un pokemon de la tabla, y espera que se muestre en el pokédex`)

it(`Apreta el botón de random y espera que se cargue un pokemon random`)

it(`Prueba cambiar de página, va, viene, selecciona manualmente. Vuelve a la página 1 y prueba 
    clickeando en Previous cuando está en gris`)
