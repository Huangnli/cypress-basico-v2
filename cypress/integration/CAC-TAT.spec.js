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
        /*======Montagem do cenário======*/
        const longText = "Estou com duvidas sobre...  teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste"

        /*======Execução======*/
        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type('Julio@huang.com')
        //por ser texto longo, foi sobreescrito o delay para valor zero, para diminuir o tempo ao preencher o texto
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        /*======Verificação======*/
        cy.get('.success').should('be.visible')

    })
})
