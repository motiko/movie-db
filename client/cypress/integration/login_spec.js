describe('Login', () => {
  beforeEach(() => {
    cy.stubRoutes()
  })


  it('Logins with correct credentials', () => {
    cy.route('POST', '/user_token', JSON.stringify( {jwt:"123"} )).as('login')
    cy.login()
    cy.get('.nav-link').should('contain','test1@moviedb.com')
  })

  it('Shows error with incorrect credentials', () => {
    cy.route('POST', '/user_token', '' , {status: 404} ).as('login')
    cy.login()
    cy.get('.alert').should('contain','Please check your email and password')
  })
})
