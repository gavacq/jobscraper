import faker from 'faker'

function getTestElement(selector: string) {
  return cy.get(`[data-test="${selector}"]`);
}
// As a user I can search for jobs using a list of keywords
describe('search interface', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('adds keywords to list', () => {
    const term = faker.random.word();
    cy.get('input').type(term)
    getTestElement('_add_button').click();
    getTestElement('_term_container').contains(term);
    getTestElement('_term_container').within(() => {
      getTestElement(`_delete_buttondiv_${term}`).should('exist');
      cy.get('div:last').contains(term);
      cy.get('button').should('be.hidden').invoke('show').pause().click();
      // cy.get('div:last').should('not.contain', term);
      // cy.get('input:last').should('have.attr', 'placeholder', 'Password')
      getTestElement(`_delete_buttondiv_${term}`).should('not.exist');
    })
    cy.pause();

      // .should('have.css', 'color')
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