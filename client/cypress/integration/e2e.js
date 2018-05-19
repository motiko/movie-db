describe('End to end test', () => {
  beforeEach(() => {
    cy.log(
      'Running end to end tests. Make sure backend is available and the database is seed with test data.',
    )
    cy.visit('/')
    cy
      .get('.nav-item')
      .contains('Rating')
      .as('ratingDropdown')
    cy.get('#searchText').as('searchInput')
    cy.get('.card').as('movieElement')
    cy
      .get('div.card:first label.dv-star-rating-full-star')
      .as('firstMovieRating')
    cy
      .get('.nav-item')
      .contains('Category')
      .as('categoryDropdown')
    cy.get('[data-cy="category-filter"]:last-child').as('categoryFilter')
    cy.get('[data-cy="movie-category"]').as('movieCategory')
  })

  context('User not logged in (view only)', () => {
    it('Can search ', () => {
      cy.get('@searchInput').type('Non existent title')
      cy.get('@movieElement').should('not.exist')
      cy
        .get('@searchInput')
        .clear()
        .blur()
      cy.get('@movieElement').should('have.length', 10)
    })

    it('Can filter by rating', () => {
      cy.get('@ratingDropdown').click()
      cy.get('label[for="min_5"]').click()
      cy.get('[aria-label="Next"]').click()
      cy.get('@firstMovieRating').should('have.length', 5)

      cy.get('@ratingDropdown').click()
      cy.get('label[for="max_1"]').click()
      cy.get('@searchInput').click()
      cy.get('@firstMovieRating').should('have.length', 1)
    })

    it('Can filter by category', () => {
      cy.get('@categoryDropdown').click()
      cy
        .get('@categoryFilter')
        .click()
        .invoke('text')
        .then(categoryName => {
          cy.get('@movieCategory').should('contain', categoryName)
        })
    })

    it('Can not rate or edit movies', () => {
      cy.get('@ratingDropdown').click()
      cy.get('label[for="max_1"]').click()
      cy
        .get('.card-deck .dv-star-rating-non-editable')
        .should('have.length', Cypress.$('.card-deck .dv-star-rating').length)
    })
  })

  context('User logged in ', () => {
    it('Can rate movies', () => {
      cy.get('.dv-star-rating-non-editable').should('exist')
      cy.login()
      cy.get('.dv-star-rating-non-editable').should('not.exist')
    })

    it('Can edit movies', () => {
      cy.login()
      cy.get('button[data-cy="delete-movie"]').contains('Delete')
      cy.get('button[data-cy="edit-movie"]').contains('Edit')
    })
  })
})
