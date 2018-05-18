
describe('Pagination', () => {
  beforeEach(() => {
    cy.stubRoutes()
  })

  it('Opens with right elements', () => {
    cy
      .get('.pagination')
      .should('contain', '……')
    cy.get('.active').should('contain', '1')
    cy.get('.page-link:first').should('contain', 'Previous')
    cy.get('.page-link:last').should('contain', 'Next')
  })

  it('Navigates to next and previous pages', () => {
    cy.get('[aria-label="Next"]').click()
    cy.get('.active').should('contain', '2')
    cy.get('[aria-label="Previous"]').click()
    cy.get('.active').should('contain', '1')
  })

  it('Surrounding pages are visible', () => {
    Cypress._.times(10, () => {
      cy.get('[aria-label="Next"]').click()
    })
    cy.get('.active').should('contain', '11')
    cy.get('.page-link').should('contain', '10')
    cy.get('.page-link').should('contain', '12')

    cy
      .get('.page-item:nth-last-child(2)')
      .find('.page-link')
      .click()

    cy.get('.active').should('contain', '100')
    Cypress._.times(10, () => {
      cy.get('[aria-label="Previous"]').click()
    })
    cy.get('.active').should('contain', '90')
    cy.get('.page-link').should('contain', '89')
    cy.get('.page-link').should('contain', '91')
  })
})
