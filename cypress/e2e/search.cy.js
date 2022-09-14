context('Search', () => {
  it('Init', () => {
    cy.visit('/search');
  });

  const searchPokemon = (pkm, imgIds) => {
    cy.get('#input-add-pokemon').type(`${pkm}{enter}`);
    cy.get('#preview-accordion-2').click();
    cy.get('#preview-accordion-2-detail')
      .should('exist')
      .then(($detail) => {
        imgIds.forEach((id) => {
          cy.wrap($detail).get(`#pkm-img-${id}`).should('exist');
        });
      });
  };

  it('Search Pokemon', () => {
    searchPokemon('Bisasam', ['1', '2', '3']);
    cy.get('#preview-accordion-1').click();
    searchPokemon('Glumanda', ['4', '5', '6']);
    cy.get('#preview-accordion-1').click();
    searchPokemon('Schiggy', ['7', '8', '9']);
    cy.get('#preview-accordion-1').click();
  });
});
