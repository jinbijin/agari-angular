describe('Agari', () => {
  it('opens the page', () => {
    cy.visit('http://localhost:4242');
    cy.title().should('equal', 'Agari');
    cy.get('header').within(() => cy.get('a').contains('アガリ'));
  });
});
