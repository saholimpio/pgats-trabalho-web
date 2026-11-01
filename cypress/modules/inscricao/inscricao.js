const seletores = {
  rodape: 'footer',
  campoEmail: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  mensagemDeSucesso: '#success-subscribe'
};

function inscreverEmail(email) {
  cy.get(seletores.rodape).scrollIntoView();
  cy.contains('Subscription').should('be.visible');
  cy.get(seletores.campoEmail).type(email);
  cy.get(seletores.botaoInscrever).click();
}

function validarInscricaoRealizada() {
  cy.get(seletores.mensagemDeSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  inscreverEmail,
  validarInscricaoRealizada
};
