const seletores = {
  nomeInicial: '[data-qa="signup-name"]',
  emailInicial: '[data-qa="signup-email"]',
  botaoIniciar: '[data-qa="signup-button"]',
  mensagemEmailExistente: 'form[action*="signup"] p',

  tituloSr: '#id_gender1',
  tituloSra: '#id_gender2',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  endereco2: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  botaoContinuar: '[data-qa="continue-button"]'
};

function acessarCadastro() {
  cy.visit('/login');
  cy.contains('New User Signup!').should('be.visible');
}

function iniciarCadastro(usuario) {
  cy.get(seletores.nomeInicial).type(usuario.nome);
  cy.get(seletores.emailInicial).type(usuario.email);
  cy.get(seletores.botaoIniciar).click();
}

function preencherDadosDaConta(usuario) {
  const seletorDoTitulo = usuario.titulo === 'Mr' ? seletores.tituloSr : seletores.tituloSra;

  cy.get(seletorDoTitulo).check();
  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.dia).select(usuario.dia);
  cy.get(seletores.mes).select(usuario.mes);
  cy.get(seletores.ano).select(usuario.ano);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();

  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.endereco2).type(usuario.endereco2);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.celular).type(usuario.celular);

  cy.get(seletores.botaoCriarConta).click();
}

function validarCadastroRealizado() {
  cy.contains('Account Created!').should('be.visible');
}

// cadastro completo: do formulário inicial até cair na home já logado
function cadastrarUsuario(usuario) {
  acessarCadastro();
  iniciarCadastro(usuario);
  preencherDadosDaConta(usuario);
  validarCadastroRealizado();
  cy.get(seletores.botaoContinuar).click();
}

function validarEmailJaCadastrado() {
  cy.get(seletores.mensagemEmailExistente)
    .should('be.visible')
    .and('contain', 'Email Address already exist!');
}

function excluirConta() {
  cy.contains('Delete Account').click();
  cy.contains('Account Deleted!').should('be.visible');
  cy.get(seletores.botaoContinuar).click();
}

module.exports = {
  acessarCadastro,
  iniciarCadastro,
  cadastrarUsuario,
  validarEmailJaCadastrado,
  excluirConta
};
