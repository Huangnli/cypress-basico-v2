// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    // runs before every test block (root-level hook)
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    // # = id
    // . = class
    it.only('preenche os campos obrigatórios e envia o formulário', function () {
        //Montagem do cenário

        //Execução
        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type('Julio@huang.com')
        cy.get('#open-text-area').type('Estou com duvidas sobre...')
        cy.get('button[type="submit"]').click()

        //Verificação
        cy.get('.success').should('be.visible')

    })
})
