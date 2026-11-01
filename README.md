# Trabalho de conclusão - automação web com Cypress

Projeto individual da disciplina de Automação de Testes na Camada de Interface (Web), da pós-graduação PGATS. A aplicação testada é o [Automation Exercise](https://www.automationexercise.com) e os casos implementados são os da página [Test Cases](https://www.automationexercise.com/test_cases):

| Caso | O que é testado |
|------|-----------------|
| 01 | Cadastro de usuário, login automático e exclusão da conta |
| 02 | Login com e-mail e senha corretos |
| 03 | Login com e-mail e senha incorretos |
| 04 | Logout |
| 05 | Cadastro com um e-mail que já existe |
| 08 | Lista de produtos e página de detalhes |
| 09 | Pesquisa de produtos |
| 10 | Inscrição na newsletter pelo rodapé |
| 15 | Pedido cadastrando o usuário antes do checkout |
| 16 | Pedido entrando na conta antes do checkout |

Os 10 casos ficam em um único arquivo, `cypress/e2e/trabalho-final.cy.js`. Cada caso cria o próprio usuário (e-mail novo a cada execução), não depende de nenhum outro e apaga a conta no final.

## Como o projeto está organizado

```
cypress/
├── e2e/trabalho-final.cy.js   cenários (só orquestram as ações)
├── modules/                   ações de negócio por funcionalidade
│   ├── cadastro/  login/  logout/  home/
│   └── produto/   pedido/  inscricao/
├── fixtures/                  dados dos testes (usuário, pedido, pagamento)
└── support/                   gerador de usuário novo e registro do relatório
```

- **Spec:** descreve o cenário e chama as ações. Não tem seletor nem asserção.
- **Módulos:** cada um guarda seus seletores em `const seletores`, as ações e as validações (`validar...`), e exporta tudo com `module.exports`.
- **Fixtures:** dados separados do código das ações.
- **baseUrl:** definida em `cypress.config.js`, por isso os testes usam caminhos como `/login`.

## Como rodar

Pré-requisito: Node.js.

```bash
npm install
npm test             # roda em modo headless e gera o relatório
npm run cypress:abrir   # abre a interface do Cypress
```

O relatório HTML (cypress-mochawesome-reporter) fica em `cypress/reports/html/index.html`.

## Pipeline

O workflow `.github/workflows/testes-e2e.yml` roda a cada push na `main` e também pode ser disparado à mão, em **Actions > Testes E2E (Cypress) > Run workflow**. No fim da execução ele guarda o relatório HTML, os screenshots e os vídeos no artifact `relatorio-cypress`.
