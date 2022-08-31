Cypress.Commands.add('clearDatabase', () => {
  if (Cypress.env('CI')) {
    cy.log('EMULATOR_HOST', Cypress.env('EMULATOR_HOST'));
    cy.exec(`curl ${Cypress.env('EMULATOR_HOST')}:8080`);
  }
  try {
    cy.exec(
      `curl -v -X DELETE "http://${Cypress.env(
        'EMULATOR_HOST',
      )}:8080/emulator/v1/projects/pokemon-zoggen/databases/(default)/documents"`,
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
      } ${Cypress.env('EMULATOR_HOST')} ${Cypress.env('AUTH_EMULATOR_HOST')}`,
    );
  } catch (e) {
    cy.task('log', e);
    process.exit(2);
  }
});

Cypress.Commands.add('login', (userson) => {
  try {
    cy.exec(
      `node ./scripts/firebase/admin-token ${
        userson
          ? 'bO8xJ8muIS0FrcYRcnN1OSUMysjf'
          : '0LkyfKRyXQlwMJzme0cxYE8Zvni8'
      }  ${Cypress.env('EMULATOR_HOST')} ${Cypress.env('AUTH_EMULATOR_HOST')}`,
    );
    cy.visit('/');
    cy.get('#login-button').should('not.exist');
  } catch (e) {
    cy.task('log', e);
    process.exit(2);
  }
});

Cypress.Commands.add('gotoRunEdit', () => {
  cy.contains('a', 'New Group Cypress').should('be.visible').click();
  cy.location('pathname', { timeout: 10000 }).should('contain', '/runs');
  cy.get('#card-action-new-run').click();
  cy.get('#back-button-run-edit').should('be.visible');
});
