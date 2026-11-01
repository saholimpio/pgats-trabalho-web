const home = require('../modules/home/home');
const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const produto = require('../modules/produto/produto');
const inscricao = require('../modules/inscricao/inscricao');
const pedido = require('../modules/pedido/pedido');
const { gerarUsuario } = require('../support/dados');

const usuarios = require('../fixtures/usuarios.json');
const dadosDoPedido = require('../fixtures/pedido.json');

describe('Trabalho de conclusão - Automation Exercise', () => {
  it('Caso 01 - deve cadastrar um novo usuário, ficar logado e excluir a conta', () => {
    const usuario = gerarUsuario();

    home.acessarHome();
    home.validarHomeVisivel();
    cadastro.cadastrarUsuario(usuario);
    login.validarUsuarioAutenticado(usuario.nome);
    cadastro.excluirConta();
  });

  it('Caso 05 - não deve cadastrar um usuário com e-mail que já existe', () => {
    const usuario = gerarUsuario();

    cadastro.cadastrarUsuario(usuario);
    logout.efetuarLogout();

    cadastro.acessarCadastro();
    cadastro.iniciarCadastro(usuario);
    cadastro.validarEmailJaCadastrado();

    // limpeza: entra de novo para apagar o usuário criado neste teste
    login.acessarLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    cadastro.excluirConta();
  });

  it('Caso 03 - deve mostrar erro ao fazer login com e-mail e senha incorretos', () => {
    login.acessarLogin();
    login.efetuarLogin(usuarios.loginInvalido.email, usuarios.loginInvalido.senha);
    login.validarMensagemDeErro();
  });

  it('Caso 02 - deve fazer login com e-mail e senha corretos e excluir a conta', () => {
    const usuario = gerarUsuario();

    cadastro.cadastrarUsuario(usuario);
    logout.efetuarLogout();

    login.acessarLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    login.validarUsuarioAutenticado(usuario.nome);
    cadastro.excluirConta();
  });

  it('Caso 04 - deve fazer logout e voltar para a tela de login', () => {
    const usuario = gerarUsuario();

    cadastro.cadastrarUsuario(usuario);
    logout.efetuarLogout();
    logout.validarRedirecionamentoParaLogin();

    // limpeza: entra de novo para apagar o usuário criado neste teste
    login.efetuarLogin(usuario.email, usuario.senha);
    cadastro.excluirConta();
  });

  it('Caso 08 - deve listar os produtos e abrir os detalhes de um produto', () => {
    home.acessarHome();
    produto.acessarProdutos();
    produto.validarListaDeProdutos();
    produto.abrirDetalhesDoPrimeiroProduto();
    produto.validarDetalhesDoProduto();
  });

  it('Caso 09 - deve pesquisar um produto e mostrar o resultado da busca', () => {
    home.acessarHome();
    produto.acessarProdutos();
    produto.pesquisarProduto(dadosDoPedido.buscaDeProduto);
    produto.validarResultadoDaPesquisa();
  });

  it('Caso 10 - deve inscrever um e-mail na newsletter pelo rodapé da home', () => {
    home.acessarHome();
    inscricao.inscreverEmail(dadosDoPedido.emailDaInscricao);
    inscricao.validarInscricaoRealizada();
  });

  it('Caso 15 - deve fazer um pedido cadastrando o usuário antes do checkout', () => {
    const usuario = gerarUsuario();

    cadastro.cadastrarUsuario(usuario);
    login.validarUsuarioAutenticado(usuario.nome);
    pedido.adicionarProdutosEIrParaCheckout(dadosDoPedido.produtos);
    pedido.confirmarPedido(usuario, dadosDoPedido);
    cadastro.excluirConta();
  });

  it('Caso 16 - deve fazer um pedido entrando na conta antes do checkout', () => {
    const usuario = gerarUsuario();

    cadastro.cadastrarUsuario(usuario);
    logout.efetuarLogout();

    login.acessarLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    login.validarUsuarioAutenticado(usuario.nome);
    pedido.adicionarProdutosEIrParaCheckout(dadosDoPedido.produtos);
    pedido.confirmarPedido(usuario, dadosDoPedido);
    cadastro.excluirConta();
  });
});
