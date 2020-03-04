describe('Schedule generator', () => {
  it('should generate a schedule', () => {
    cy.server();
    cy.route(
      'POST',
      'http://localhost:5001/graphql',
      'fixture:generate-schedule/response-success.json'
    );

    cy.visit('http://localhost:4242/schedule-generator');

    cy.get('[data-test-id="round-input"]').type('4');
    cy.get('[data-test-id="participant-input"]').type('20');
    cy.get('[data-test-id="request-button"]').click();

    cy.get('[data-test-id="schedule-round"]').should('have.length', 4);
  });

  it('should show a snackbar if no schedule is generated', () => {
    cy.server();
    cy.route(
      'POST',
      'http://localhost:5001/graphql',
      'fixture:generate-schedule/response-graphql-error.json'
    );

    cy.visit('http://localhost:4242/schedule-generator');

    cy.get('[data-test-id="round-input"]').type('9');
    cy.get('[data-test-id="participant-input"]').type('36');
    cy.get('[data-test-id="request-button"]').click();

    cy.get('.mat-simple-snackbar').should('have.length', 1);
  });
});
