// E2E Test for the Todo Application

describe("Todo Application", () => {
  beforeEach(() => {
    cy.visit("/");
    // Clear local storage to start fresh
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  // Test: Add a new todo item and verify it is added to the list
  it("should add a new todo item and verify it is added to list", () => {
    const todoText = "Walk the dog";
    cy.get('input[placeholder="What needs to be done?"]').type(
      todoText + "{enter}"
    );
    // Verify the todo item is added to the list
    cy.contains(todoText).should("exist");
  });

  // Test: Add a new todo item and verify a different item is not in the list
  it("should add a new todo item and verify it is not already in the list", () => {
    const todoText = "Walk the dog";
    cy.get('input[placeholder="What needs to be done?"]').type(
      todoText + "{enter}"
    );
    // Verify the todo item is not already in the list
    cy.contains("Walk the cat").should("not.exist");
  });

  // Test: Add todos from a fixture file and verify each item is added
  it("should add todos from fixture and verify they are added", () => {
    cy.fixture("todos.json").then((todos: Array<{ text: string }>) => {
      todos.forEach((todo) => {
        cy.get('input[placeholder="What needs to be done?"]').type(
          todo.text + "{enter}"
        );
        // Verify each todo item is added to the list
        cy.contains(todo.text).should("exist");
      });
    });
  });

  // Test: Add two todos, check one as completed, and verify its completed state
  it("should add two new todo items and check one as completed, verify it is completed", () => {
    const todoText1 = "Walk the dog";
    const todoText2 = "Walk the cat";
    cy.get('input[placeholder="What needs to be done?"]').type(
      todoText1 + "{enter}"
    );
    cy.contains(todoText1).should("exist");
    cy.get('input[placeholder="What needs to be done?"]').type(
      todoText2 + "{enter}"
    );
    cy.contains(todoText2).should("exist");
    // Check the first todo item as completed
    cy.contains(todoText1).parent().find("input[type='checkbox']").check();
    // Verify the first todo item is marked as completed
    cy.contains(todoText1).parent().should("have.class", "completed");
  });

  // Test: Add two todos, delete one, and verify the other remains
  it("should add two new todo items and delete one item, verify the other is still present", () => {
    const todoText1 = "Walk the dog";
    const todoText2 = "Walk the cat";
    cy.get('input[placeholder="What needs to be done?"]').type(
      todoText1 + "{enter}"
    );
    cy.contains(todoText1).should("exist");
    cy.get('input[placeholder="What needs to be done?"]').type(
      todoText2 + "{enter}"
    );
    cy.contains(todoText2).should("exist");
    // Delete the first todo item
    cy.contains(todoText1).parent().find("button[class=remove-button]").click();
    // Verify the first todo item is deleted
    cy.contains(todoText1).should("not.exist");
    // Verify the second todo item is still present
    cy.contains(todoText2).should("exist");
  });
});
