describe('proxy', () => {
  it('can talk to backend', () => {
    cy.request('/hello').then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('message', 'Hello, World!') // true
      }
    )
  })
})