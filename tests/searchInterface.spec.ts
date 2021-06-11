import faker from 'faker'
import * as s from '../src/styles/app.module.scss'

// As a user I can search for jobs using a list of keywords
describe('search interface', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('adds keywords to list', () => {
    const term = faker.random.word();
    cy.get('input').type(term).get(s.addbutton).click()
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