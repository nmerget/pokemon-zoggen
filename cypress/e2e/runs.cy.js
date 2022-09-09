context('Runs', () => {
  before(() => {
    cy.clearDatabase();
    cy.seedDefault('/runs-dump.json');
  });

  it('Init', () => {
    cy.visit('/');
  });

  const addPokemon = (pkm) => {
    cy.get('#input-add-pokemon').type(`${pkm}{enter}`);
    cy.get('#add-pokemon-button').click();
    cy.contains('span', pkm);
  };

  it('Add Pokemon', () => {
    cy.gotoRunEdit().then(() => {
      cy.get('#button-edit-mode').click();
      addPokemon('Bisasam');
      addPokemon('Glumanda');
      addPokemon('Schiggy');
      cy.get('#add-pokemon-button').should('not.exist');
    });
  });
});
