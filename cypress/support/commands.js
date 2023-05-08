Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Julio')
    cy.get('#lastName').type('Huang')
    cy.get('#email').type('Julio@huang.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})