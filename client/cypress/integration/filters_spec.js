describe('Filters', () => {
  beforeEach(() => {
    cy.stubRoutes()
  })

  it('Have selectable categories', () => {
    cy.get('.nav-item').contains('Category').click()
    cy.get('div.dropdown-menu.show').find('button:first').click()
    cy.get('div.dropdown-menu.show').find('button:last').click()
    cy.get('div.dropdown-menu.show').find('.selected').should('have.length', 2)
  })

  it('Have selectable ratings', () => {
    cy.get('.nav-item').contains('Rating').click()
    cy.get('label[for="min_5"]').click()
    cy.get('.nav-item div.dv-star-rating ').find('label.dv-star-rating-full-star').should('have.length',10)
    cy.get('label[for="max_1"]').click()
    cy.get('label[for="max_2"]').should('have.class', 'dv-star-rating-empty-star')
    cy.get('label[for="min_2"]').should('have.class', 'dv-star-rating-empty-star')
    cy.get('label[for="min_2"]').click()
    cy.get('label[for="max_2"]').should('have.class', 'dv-star-rating-full-star')
    cy.get('label[for="min_2"]').should('have.class', 'dv-star-rating-full-star')
  })
})
