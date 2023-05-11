// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    const THREE_SECONDS_IN_MS = 3000

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
        const longText = Cypress._.repeat('Estou com duvidas sobre...', 5)

        /*======Execução======*/
        cy.clock() // Parar o tempo do navegador

        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type('Julio@huang.com')
        //por ser texto longo, foi sobreescrito o delay para valor zero, para diminuir o tempo ao preencher o texto
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        /*======Verificação======*/
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS) // Avançar 3s
        cy.get('.success').should('not.be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const errorEmail = "Julio2huang.com"

        /*======Execução======*/
        cy.clock()
        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type(errorEmail)
        cy.get('#open-text-area').type('Test')
        cy.contains('button', 'Enviar').click()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(3, function () {
        it('verifica se campo de telefone só aceita números ao preencher valor não-numérico', function () {
            const phone = 'DDD'

            /*======Execução======*/
            cy.get('#phone').type(phone)

            /*======Verificação======*/
            cy.get('#phone').should('have.value', '')

        })
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        /*======Execução======*/
        cy.clock()
        cy.get('#firstName').type('Julio')
        cy.get('#lastName').type('Huang')
        cy.get('#email').type('Julio@huang.com')
        cy.get('#open-text-area').type('Test')
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
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
        /*======Execução======*/
        cy.clock()
        cy.contains('button', 'Enviar').click()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        /*======Execução======*/
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        /*======Verificação======*/
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {


        /*======Execução e Verificação======*/
        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {

        /*======Execução e Verificação======*/
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function () {
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

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        /*======Execução======*/
        cy.clock()
        cy.get('#phone-checkbox').check()
        cy.fillMandatoryFieldsAndSubmit()

        /*======Verificação======*/
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        // Atributo target com o valor _blank, quando clicado, obrigatóriamente o valor do atributo href será aberto em uma nova aba
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        /*======Execução======*/
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        /*======Verificação======*/
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it.only('preenche a area de texto usando o comando invoke', function () {
        const longText = Cypress._.repeat('0123456789', 20)

        /*======Execução e Verificação======*/
        cy.get('#open-text-area')
            .invoke('val', longText) // invoke val simulando ctrl+v
            .should('have.value', longText) 
    })
})
