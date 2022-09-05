context('Runs', () => {
  before(() => {
    cy.clearDatabase();
    cy.seedDefault('/runs-dump.json');
  });

  it('Init', () => {
    cy.visit('/');
  });

  it('Add Pokemon', () => {
    cy.gotoRunEdit();
    ['Bisasam', 'Glumanda', 'Schiggy'].forEach((pkm) => {
      cy.get('#input-add-pokemon').type(`${pkm}{enter}`);
      cy.get('#add-pokemon-button').click();
      cy.contains('span', pkm);
    });
  });
});
