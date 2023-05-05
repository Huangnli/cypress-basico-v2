// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    //Verificar o titulo do ./src/index.html
    it('verifica o título da aplicação', function() {
        cy.visit('./src/index.html')
        
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
  })
  