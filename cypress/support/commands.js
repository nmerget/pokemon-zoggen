Cypress.Commands.add('clearDatabase', () => {
  cy.exec('npm run clear-database');
});

Cypress.Commands.add('seedDefault', (customDump) => {
  cy.exec(
    `node ./scripts/firebase/seed-firestore ./cypress/fixtures${
      customDump || '/default-dump.json'
    }`,
  );
});

Cypress.Commands.add('login', (userson) => {
  cy.exec(
    `node ./scripts/firebase/admin-token ${
      userson ? 'bO8xJ8muIS0FrcYRcnN1OSUMysjf' : '0LkyfKRyXQlwMJzme0cxYE8Zvni8'
    }`,
  );
  cy.visit('/');
  cy.get('#login-button').should('not.exist');
});

Cypress.Commands.add('gotoRunEdit', () => {
  cy.contains('a', 'New Group Cypress').should('be.visible').click();
  cy.location('pathname', { timeout: 10000 }).should('contain', '/runs');
  cy.get('#card-action-new-run').click();
  cy.get('#back-button-run-edit').should('be.visible');
});
