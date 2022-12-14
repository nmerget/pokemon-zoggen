Cypress.Commands.add('clearDatabase', () => {
  try {
    cy.exec(
      `curl -v -X DELETE "http://localhost:8080/emulator/v1/projects/pokemon-zoggen/databases/(default)/documents"`,
    );
  } catch (e) {
    cy.task('log', e);
    process.exit(2);
  }
});

Cypress.Commands.add('seedDefault', (customDump) => {
  try {
    cy.exec(
      `node ./scripts/firebase/seed-firestore ./cypress/fixtures${
        customDump || '/default-dump.json'
      }`,
    );
  } catch (e) {
    cy.task('log', e);
    process.exit(2);
  }
});

Cypress.Commands.add('gotoRunEdit', () => {
  cy.get('#main-menu-item-2').click();
  cy.get('#sub-nav-item-0').click();
  cy.location('pathname', { timeout: 10000 }).should('contain', '/runs');
  cy.get('#card-action-new-run').click();
  cy.get('#back-button-run-edit').should('be.visible');
});
