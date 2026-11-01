const seletores = {
  linkSair: 'a[href*="logout"]'
};

function efetuarLogout() {
  cy.get(seletores.linkSair).click();
}

function validarRedirecionamentoParaLogin() {
  cy.url().should('include', '/login');
  cy.contains('Login to your account').should('be.visible');
}

module.exports = {
  efetuarLogout,
  validarRedirecionamentoParaLogin
};
