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
        cy.contains('button', 'Enviar').click()

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
        cy.contains('button', 'Enviar').click()

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

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        /*======Montagem do cenário======*/

        /*======Execução======*/
        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type('Julio@huang.com')
        cy.get('#open-text-area').type('Test')
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        /*======Montagem do cenário======*/
        const firstName = 'Julio'
        const lastName = 'Huang'
        const email = 'Julio@huang.com'
        const phone = '1234567890'

        /*======Execução e Verificação======*/
        cy.get('#firstName').type(firstName).should('have.value', firstName)
        cy.get('#lastName').type(lastName).should('have.value', lastName)
        cy.get('#email').type(email).should('have.value', email)
        cy.get('#phone').type(phone).should('have.value', phone)

        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        /*======Montagem do cenário======*/

        /*======Execução======*/
        cy.contains('button', 'Enviar').click()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        /*======Montagem do cenário======*/
        /*======Execução======*/
        cy.fillMandatoryFieldsAndSubmit()

        /*======Verificação======*/
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        /*======Montagem do cenário======*/

        /*======Execução e Verificação======*/
        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        /*======Montagem do cenário======*/

        /*======Execução e Verificação======*/
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function () {
        /*======Montagem do cenário======*/

        /*======Execução e Verificação======*/
        cy.get('#product').select(1).should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function () {
        /*======Execução e Verificação======*/
        cy.get('#support-type [type="radio"][value="feedback"]').check().should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function () {
        /*======Execução e Verificação======*/
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check().should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        /*======Execução e Verificação======*/
        cy.get('#check [type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        /*======Execução======*/
        cy.get('#phone-checkbox').check()
        cy.fillMandatoryFieldsAndSubmit()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
    })
})
