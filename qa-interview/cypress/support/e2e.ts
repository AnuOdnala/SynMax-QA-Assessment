import "./commands";
import "@testing-library/cypress/add-commands";

// Prevent uncaught exceptions from failing tests
Cypress.on("uncaught:exception", () => false);
