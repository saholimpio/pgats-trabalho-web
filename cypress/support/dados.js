const usuarios = require('../fixtures/usuarios.json');

// monta um usuário novo a cada chamada, porque o e-mail precisa ser único no site
function gerarUsuario() {
  const sufixo = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    ...usuarios.usuarioPadrao,
    email: `pgats.${sufixo}@example.com`
  };
}

module.exports = {
  gerarUsuario
};
