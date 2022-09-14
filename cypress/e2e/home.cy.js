context('Home', () => {
  before(() => {
    cy.clearDatabase();
    cy.seedDefault('/home-dump.json');
  });

  it('Init', () => {
    cy.visit('/');
  });

  it('Pokemon Accordion', () => {
    cy.get('#preview-accordion-0').click();
    cy.get('#preview-accordion-0-detail')
      .should('exist')
      .then(($detail) => {
        let feuer = 0;
        let pflanze = 0;
        let gift = 0;
        cy.wrap($detail)
          .find('div[class*="typing-badge"]')
          .each(($typingBadge) => {
            if ($typingBadge.text() === 'Feuer') {
              feuer++;
            } else if ($typingBadge.text() === 'Pflanze') {
              pflanze++;
            } else if ($typingBadge.text() === 'Gift') {
              gift++;
            }
          })
          .then(() => {
            expect(feuer).to.equal(1);
            expect(pflanze).to.equal(2);
            expect(gift).to.equal(2);
          });
        cy.wrap($detail)
          .find('span[class*="pkm-lvl"]')
          .each(($lvl) => {
            expect($lvl.text()).to.includes('20');
          });
      });
  });

  it('Typing Accordion', () => {
    cy.get('#preview-accordion-1').click();
    cy.get('#preview-accordion-1-detail')
      .should('exist')
      .then(($detail) => {
        let feuer = 0;
        let pflanze = 0;
        let gift = 0;
        cy.wrap($detail)
          .find('div[class*="typing-badge"]')
          .each(($typingBadge) => {
            if ($typingBadge.text() === 'Feuer') {
              feuer++;
            } else if ($typingBadge.text() === 'Pflanze') {
              pflanze++;
            } else if ($typingBadge.text() === 'Gift') {
              gift++;
            }
          })
          .then(() => {
            expect(feuer).to.equal(1);
            expect(pflanze).to.equal(1);
            expect(gift).to.equal(1);
          });
      });
  });
});
