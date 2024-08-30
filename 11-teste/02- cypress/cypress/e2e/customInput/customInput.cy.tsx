describe("CustomInput Accessibility", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders CustomInput components correctly", () => {
    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="date"]').should("exist");
    cy.get('label[for="name"]').should("contain", "Nome");
    cy.get('label[for="date"]').should("contain", "Data de nascimento");
  });

  it("shows error message for invalid name input", () => {
    cy.get('input[name="name"]').type("John");
    cy.contains("Nome deve ser maior que 7 caracteres").should("exist");
  });

  it("submits the form correctly", () => {
    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");

      const testDate = "2000-01-01";

      cy.get('input[name="name"]').type("John Doe");
      cy.get('input[name="date"]')
        .type(testDate)
        .should("have.value", testDate);
      cy.get("form").submit();

      cy.get("@consoleLog").should(
        "be.calledWith",
        "John Doe",
        new Date(testDate)
      );
    });
  });

  it("displays placeholder text correctly", () => {
    cy.get('input[name="name"]').should(
      "have.attr",
      "placeholder",
      "Digite o nome"
    );
    cy.get('input[name="date"]').should(
      "have.attr",
      "placeholder",
      "Digite a data de nascimento"
    );
  });
});
