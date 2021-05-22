describe('ButtonComponent', () => {
  it('should create', () => {
    cy.visit('http://localhost:4242/demo/button?color=primary&content=Button');
    cy.url().should('equal', 'http://localhost:4242/demo/button?color=primary&content=Button');
    cy.get('[data-cy="demo-host"] button[agariButton]');
  });
});
