describe('Schedule generator', () => {
  it('should generate a schedule', () => {
    cy.fixture('generate-schedule/response-success.json').then(fixture => cy.intercept('GET', 'http://localhost:5001/schedule/round-robin?participantCount=20&roundCount=4', fixture));
    cy.intercept('GET', 'http://localhost:5001/schedule/round-robin/validate*', { data: true, error: null });
    cy.intercept('GET', 'http://localhost:5001/schedule/round-robin/max-rounds*', { data: 5, error: null });

    cy.visit('http://localhost:4242/schedule-generator');

    cy.get('[data-test-id="participant-input"]').type('20');
    cy.get('[data-test-id="round-select"]').click();
    cy.get('mat-option').contains('4').click();

    cy.get('[data-test-id="request-button"]').click();

    cy.get('[data-test-id="schedule-round"]').should('have.length', 4);
  });
});
