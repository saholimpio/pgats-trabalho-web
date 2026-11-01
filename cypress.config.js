const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportPageTitle: 'Trabalho de Conclusão - Automation Exercise',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },

  // o site carrega anúncios que às vezes cobrem os botões
  blockHosts: [
    '*googlesyndication.com',
    '*googleadservices.com',
    '*doubleclick.net',
    '*adtrafficquality.google'
  ],

  // na pipeline, tenta de novo antes de dar o teste como quebrado
  retries: {
    runMode: 2,
    openMode: 0
  },

  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    watchForFileChanges: false,
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  }
});
