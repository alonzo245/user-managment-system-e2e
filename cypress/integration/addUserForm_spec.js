
const getRandom = () => Math.ceil(Math.random(1) * 100)

  describe('Add users form', () => {
    it('Should enter data into form and submit', () => {
      cy.visit('http://localhost:3000/' )

      cy.get('.add-user-form').within(($form) => {
        cy.get('input[name="firstName"]').type(`john${getRandom()}`)
        cy.get('input[name="lastName"]').type(`Doe${getRandom()}`)
        cy.get('input[name="email"]').type(`john.doe${getRandom()}@email${getRandom()}.com`)
        cy.get('input[name="password"]').type('password')
        cy.get('input[name="description"]').type('describe')
        cy.root().submit()
      })
    })
    
  })

  