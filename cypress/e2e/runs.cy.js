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

  it('Test all Inputs', () => {
    cy.get('#edit-pokemon-container')
      .find('input[type="text"]')
      .each(($input) => {
        cy.wrap($input).type(`{enter}`);
      });
    cy.get('#edit-pokemon-container')
      .find('input[type="number"]')
      .each(($input) => {
        cy.wrap($input).clear().type('20');
      });
    cy.get('#edit-pokemon-container')
      .find('input[type="checkbox"]')
      .as('checkboxes')
      .check();
    cy.get('#button-edit-mode')
      .click()
      .then(() => {
        let tackles = 0;
        let kratzer = 0;
        let feuer = 0;
        let wasser = 0;
        let pflanze = 0;
        cy.get('#pokemon-container')
          .should('exist')
          .find('div[class*="typing-badge"]')
          .each(($typingBadge) => {
            if ($typingBadge.text() === 'Tackle') {
              tackles++;
            } else if ($typingBadge.text() === 'Kratzer') {
              kratzer++;
            } else if ($typingBadge.text() === 'Feuer') {
              feuer++;
            } else if ($typingBadge.text() === 'Wasser') {
              wasser++;
            } else if ($typingBadge.text() === 'Pflanze') {
              pflanze++;
            }
          })
          .then(() => {
            expect(tackles).to.equal(8);
            expect(kratzer).to.equal(4);
            expect(feuer).to.equal(1);
            expect(wasser).to.equal(1);
            expect(pflanze).to.equal(1);
          });

        cy.get('#pokemon-container')
          .should('exist')
          .find('span[class*="pkm-show-lvl"]')
          .each(($lvl) => {
            expect($lvl.text()).to.includes('20');
          });
      });
  });
});
