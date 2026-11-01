const seletores = {
  linkProdutos: 'a[href="/products"]',
  listaDeProdutos: '.features_items .product-image-wrapper',
  linkVerProduto: '.features_items a[href^="/product_details/"]',
  informacoesDoProduto: '.product-information',
  nomeDoProduto: '.product-information h2',
  campoDeBusca: '#search_product',
  botaoBuscar: '#submit_search',
  nomeNaListagem: '.productinfo p'
};

function acessarProdutos() {
  cy.get(seletores.linkProdutos).first().click();
  cy.contains('All Products').should('be.visible');
}

function validarListaDeProdutos() {
  cy.get(seletores.listaDeProdutos)
    .should('have.length.greaterThan', 0)
    .first()
    .should('be.visible');
}

function abrirDetalhesDoPrimeiroProduto() {
  cy.get(seletores.linkVerProduto).first().click();
  cy.url().should('include', '/product_details/');
}

function validarDetalhesDoProduto() {
  cy.get(seletores.nomeDoProduto).should('be.visible');
  cy.get(seletores.informacoesDoProduto)
    .should('contain.text', 'Category:')
    .and('contain.text', 'Rs.')
    .and('contain.text', 'Availability:')
    .and('contain.text', 'Condition:')
    .and('contain.text', 'Brand:');
}

function pesquisarProduto(termo) {
  cy.get(seletores.campoDeBusca).type(termo);
  cy.get(seletores.botaoBuscar).click();
}

function validarResultadoDaPesquisa() {
  cy.contains('Searched Products').should('be.visible');
  cy.get(seletores.listaDeProdutos)
    .should('have.length.greaterThan', 0)
    .each(($produto) => {
      cy.wrap($produto).find(seletores.nomeNaListagem).should('be.visible');
    });
}

module.exports = {
  acessarProdutos,
  validarListaDeProdutos,
  abrirDetalhesDoPrimeiroProduto,
  validarDetalhesDoProduto,
  pesquisarProduto,
  validarResultadoDaPesquisa
};
