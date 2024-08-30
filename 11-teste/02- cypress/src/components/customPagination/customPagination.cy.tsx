import { mount } from "cypress/react18";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import CustomPagination from "./index";

describe("CustomPagination Component", () => {
  beforeEach(() => {
    // Use a cy.stub() instead of cy.spy() for better TypeScript support
    const onPageChange = cy.stub().as("onPageChange");

    mount(
      <ThemeProvider theme={theme}>
        <CustomPagination
          currentPage={1}
          totalPages={10}
          onPageChange={onPageChange}
        />
      </ThemeProvider>
    );
  });

  it("renders pagination component correctly", () => {
    cy.get("button").should("have.length", 12); // 10 page buttons + 2 navigation buttons
  });

  it("displays the correct current page and total pages", () => {
    cy.contains("Página 1 de 10");
  });

  it('disables the "<<" button on the first page', () => {
    cy.get("button").first().should("be.disabled");
  });

  it('enables the ">>" button on the first page', () => {
    cy.get("button").last().should("not.be.disabled");
  });

  it("navigates to the correct page on button click", () => {
    cy.get("button").contains("2").click();
    cy.get("@onPageChange").should("have.been.calledWith", 2);
  });

  it("displays the correct range of page buttons", () => {
    cy.get("button").contains("1").should("exist");
    cy.get("button").contains("10").should("exist");
  });

  it("updates the page buttons correctly when navigating to later pages", () => {
    const onPageChange = cy.stub().as("onPageChange");
    mount(
      <ThemeProvider theme={theme}>
        <CustomPagination
          currentPage={6}
          totalPages={10}
          onPageChange={onPageChange}
        />
      </ThemeProvider>
    );
    cy.get("button").contains("6").should("exist");
    cy.get("button").contains("10").should("exist");
  });

  it("applies bold style to the current page button", () => {
    cy.get("button").contains("1").should("have.css", "font-weight", "700");
  });

  it("calls onPageChange with correct page number", () => {
    cy.get("button").contains("3").click();
    cy.get("@onPageChange").should("have.been.calledWith", 3);
  });

  it('navigates to the first page when "<<" is clicked', () => {
    cy.get("button").first().click();
    cy.get("@onPageChange").should("have.been.calledWith", 1);
  });

  it('navigates to the last page when ">>" is clicked', () => {
    cy.get("button").last().click();
    cy.get("@onPageChange").should("have.been.calledWith", 10);
  });
});
