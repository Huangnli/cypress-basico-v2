it('testa a página da política de privacidade de forma independente', function () {
    /*======Execução======*/
    cy.visit('./src/privacy.html')

    /*======Verificação======*/
    cy.contains('Talking About Testing').should('be.visible')
})