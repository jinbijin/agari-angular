describe('opening page', () => {
  it('opens the page', () => {
    cy.visit('http://localhost:4242');
    expect(true).to.equal(true);
  });
});
