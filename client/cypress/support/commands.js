Cypress.Commands.add('stubRoutes', () => {
  cy.server()
  cy.route('GET', '/category', 'fixture:categories.json').as('category')
  cy.route('GET', '/movie*', 'fixture:movies.json').as('movie')
  cy.route('POST', '/movie', 'fixture:new_movie_response.json').as('newMovie')
  cy.visit('/', {
    onBeforeLoad: win => {
      win.fetch = null
    },
  })
})

Cypress.Commands.add('login', () => {
  cy
    .get('nav')
    .contains('Login')
    .click()
  cy.get('#emailInput').type('test1@moviedb.com')
  cy.get('#passwordInput').type('123123')
  cy
    .get('button')
    .contains('Login')
    .click()
})
