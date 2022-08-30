context('Admin', () => {
  before(() => {
    cy.clearDatabase();
    cy.seedDefault();
  });

  it('Login', () => {
    cy.login();
  });

  it('Check for Admin', () => {
    cy.get('#avatar-button').click();
    cy.get('#menu-item-admin').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/admin');
  });

  it('Add new group', () => {
    cy.get('#add-group').click();
    cy.get('#select-version').click();
    cy.get('#menu-item-version-1').click();
    cy.get('#dialog-continue').click();
  });

  it('Change group', () => {
    cy.get('input').first().type(' Cypress');
    cy.get('#add-run-button-0').click();
  });

  it('Has created run', () => {
    cy.gotoRunEdit();
  });
});
