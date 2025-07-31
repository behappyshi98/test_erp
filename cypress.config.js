const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,

  e2e: {
    
    experimentalSessionAndOrigin: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,
  },
});

