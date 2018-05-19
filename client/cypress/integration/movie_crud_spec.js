describe('Movie Create and Delete', () => {
  beforeEach(() => {
    cy.stubRoutes()
  })

  context('Logged in user', () => {
    it('can create and delete a movie', () => {
      cy.route('POST', '/user_token', 'fx:user_token').as('login')
      cy.login()
      cy.get('[data-cy="open-movie-dialog"]').click()
      cy.fixture('new_movie').then(movie => {
        cy.get('[data-cy="movie-title-input"]').type(movie.title)
        cy
          .get('[data-cy="movie-description-input"]')
          .click()
          .type(movie.category)
        cy.get('[data-cy="movie-category-select"]').select(movie.category)
        cy.get('[data-cy="movie-save-btn"]').click()
        cy.get('[data-cy="movie-view-title"]').contains(movie.title)
        cy
          .get('[data-cy="movie-view-description"]')
          .contains(movie.description)
          .siblings('[data-cy="movie-category"]')
          .should('contain', movie.category)
          .parent()
          .find('[data-cy="delete-movie"]')
          .click()
          .should('not.exist')
      })
    })

    it('', () => {})
  })

  context('Guest user (Not logged in)', () => {
    it('can not create or delete movies', () => {
      cy.route('POST', '/user_token', '', {status: 404}).as('login')
      cy.login()
      cy.get('[data-cy="delete-movie"]').should('not.exist')
      cy.get('[data-cy="open-movie-dialog"]').should('not.exist')
    })
  })
})
