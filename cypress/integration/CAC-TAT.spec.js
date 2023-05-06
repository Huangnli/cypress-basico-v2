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
    it('preenche os campos obrigatórios e envia o formulário', function () {
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

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        /*======Montagem do cenário======*/
        const errorEmail = "Julio2huang.com"

        /*======Execução======*/
        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type(errorEmail)
        cy.get('#open-text-area').type('Test')
        cy.get('button[type="submit"]').click()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
    })

    it('verifica se campo de telefone só aceita números ao preencher valor não-numérico', function () {
        /*======Montagem do cenário======*/
        const phone = 'DDD'

        /*======Execução======*/
        cy.get('#phone').type(phone)

        /*======Verificação======*/
        cy.get('#phone').should('have.value', '')

    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        /*======Montagem do cenário======*/

        /*======Execução======*/
        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type('Julio@huang.com')
        cy.get('#open-text-area').type('Test')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
    })
})
