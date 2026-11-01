function acessarHome() {
  cy.visit('/');
}

function validarHomeVisivel() {
  cy.contains('Full-Fledged practice website for Automation Engineers')
    .should('be.visible');
}

module.exports = {
  acessarHome,
  validarHomeVisivel
};
