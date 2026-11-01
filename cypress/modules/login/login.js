const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemDeErro: 'form[action*="login"] > p',
  usuarioAutenticado: '.navbar-nav li'
};

function acessarLogin() {
  cy.visit('/login');
  cy.contains('Login to your account').should('be.visible');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha);
  cy.get(seletores.botaoEntrar).click();
}

function validarUsuarioAutenticado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .contains(`Logged in as ${nome}`)
    .should('be.visible');
}

function validarMensagemDeErro() {
  cy.get(seletores.mensagemDeErro)
    .should('be.visible')
    .and('contain', 'Your email or password is incorrect!');
}

module.exports = {
  acessarLogin,
  efetuarLogin,
  validarUsuarioAutenticado,
  validarMensagemDeErro
};
