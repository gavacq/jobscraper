// As a user I can search for jobs using a list of keywords
describe('search interface', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.get('h1').contains('Jobscraper');
  });
  
  it.only('has a search button', () => {
    cy.get('form').find('button').type('submit');
  });
  
  it('displays a search bar with prompt text', () => {
    
  });
  
  it('has an add button', () => {

  });

  it('adds terms to keyword list', () => {

  });

  it('removes terms from keyword list', () => {

  });

  it('searches for keywords', () => {

  });
})