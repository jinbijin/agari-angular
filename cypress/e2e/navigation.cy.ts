describe('Agari', () => {
  it('opens the landing page', () => {
    cy.visit('http://localhost:4242');
    cy.url().should('equal', 'http://localhost:4242/');
  });

  it('opens the schedule generator page', () => {
    cy.visit('http://localhost:4242/schedule-generator');
    cy.url().should('equal', 'http://localhost:4242/schedule-generator');
  });

  it('opens the landing page via brand', () => {
    cy.visit('http://localhost:4242/schedule-generator');
    cy.get('header').within(() =>
      cy
        .get('a')
        .contains('アガリ')
        .click()
    );
    cy.url().should('equal', 'http://localhost:4242/');
  });

  it('opens the schedule generator page via menu', () => {
    cy.visit('http://localhost:4242');
    cy.get('header').within(() => {
      cy.get('button')
        .contains('menu')
        .click();
    });
    cy.get('a')
      .contains('Schedule generator')
      .click();
    cy.url().should('equal', 'http://localhost:4242/schedule-generator');
  });
});
