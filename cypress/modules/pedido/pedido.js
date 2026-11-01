const seletores = {
  linkProdutos: 'a[href="/products"]',
  botaoAdicionar: (id) => `a.add-to-cart[data-product-id="${id}"]`,
  linkCarrinho: 'a[href="/view_cart"]',
  itensDoCarrinho: '#cart_info tr[id^="product-"]',
  enderecoDeEntrega: '#address_delivery',
  enderecoDeCobranca: '#address_invoice',
  comentario: 'textarea[name="message"]',
  nomeNoCartao: '[data-qa="name-on-card"]',
  numeroDoCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesDeValidade: '[data-qa="expiry-month"]',
  anoDeValidade: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]'
};

// parte da compra comum aos dois fluxos: escolher produtos e chegar no checkout
function adicionarProdutosEIrParaCheckout(idsDosProdutos) {
  cy.get(seletores.linkProdutos).first().click();
  cy.contains('All Products').should('be.visible');

  idsDosProdutos.forEach((id) => {
    // o botão só aparece no hover, por isso o force
    cy.get(seletores.botaoAdicionar(id)).first().click({ force: true });
    cy.contains('Added!').should('be.visible');
    cy.contains('Continue Shopping').click();
  });

  cy.get(seletores.linkCarrinho).first().click();
  cy.get(seletores.itensDoCarrinho).should('have.length', idsDosProdutos.length);
  cy.contains('Proceed To Checkout').click();
}

function validarRevisaoDoPedido(usuario, quantidadeDeProdutos) {
  cy.get(seletores.enderecoDeEntrega)
    .should('contain.text', `${usuario.primeiroNome} ${usuario.sobrenome}`)
    .and('contain.text', usuario.endereco)
    .and('contain.text', usuario.cidade)
    .and('contain.text', usuario.estado)
    .and('contain.text', usuario.cep)
    .and('contain.text', usuario.celular);
  cy.get(seletores.enderecoDeCobranca)
    .should('contain.text', usuario.endereco);
  cy.get(seletores.itensDoCarrinho).should('have.length', quantidadeDeProdutos);
}

function finalizarPedido(comentario, pagamento) {
  cy.get(seletores.comentario).type(comentario);
  cy.contains('Place Order').click();

  cy.get(seletores.nomeNoCartao).type(pagamento.nomeNoCartao);
  cy.get(seletores.numeroDoCartao).type(pagamento.numero);
  cy.get(seletores.cvc).type(pagamento.cvc);
  cy.get(seletores.mesDeValidade).type(pagamento.mes);
  cy.get(seletores.anoDeValidade).type(pagamento.ano);
  cy.get(seletores.botaoPagar).click();
}

function validarPedidoConfirmado() {
  cy.url().should('include', '/payment_done/');
  cy.contains('Congratulations! Your order has been confirmed!')
    .should('be.visible');
}

// do checkout até a confirmação, para os casos 15 e 16
function confirmarPedido(usuario, pedido) {
  validarRevisaoDoPedido(usuario, pedido.produtos.length);
  finalizarPedido(pedido.comentario, pedido.pagamento);
  validarPedidoConfirmado();
}

module.exports = {
  adicionarProdutosEIrParaCheckout,
  confirmarPedido
};
