import { defineConfig } from "cypress";
import sharedConfig from "./cypress.shared.config";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    ...sharedConfig,
    baseUrl: "http://localhost:3000/",
  },
});
