// As a user I can search for jobs using a list of keywords
describe('search interface', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('h1').contains('Jobscraper');
  });

  it('has a green search button', () => {
    cy.get('form').find('button').type('submit')
      .should('have.css', 'color')
      .and('eq', 'rgb(0, 128, 0)');
  });

  it('displays a search bar with prompt text', () => {

  });

  it.skip('searches for keywords', () => {

  });

  it.skip('displays the results in cards', () => {

  });

  it.skip('has an add button', () => {

  });

  it.skip('adds terms to keyword list', () => {

  });

  it.skip('removes terms from keyword list', () => {

  });

})