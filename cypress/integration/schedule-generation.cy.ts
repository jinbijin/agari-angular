describe('Schedule generator', () => {
  it('should generate a schedule', () => {
    cy.fixture('generate-schedule/response-success.json').then(fixture => cy.intercept('POST', 'http://localhost:5001/schedule/round-robin', fixture));
    cy.intercept('POST', 'http://localhost:5001/schedule/round-robin/validate', { data: true, error: null });

    cy.visit('http://localhost:4242/schedule-generator');

    cy.get('[data-test-id="round-input"]').type('4');
    cy.get('[data-test-id="participant-input"]').type('20');
    cy.get('[data-test-id="request-button"]').click();

    cy.get('[data-test-id="schedule-round"]').should('have.length', 4);
  });
});
