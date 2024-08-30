import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import CustomPagination from "./index";

describe("CustomPagination Component", () => {
  const renderComponent = (currentPage = 1, totalPages = 10) => {
    const onPageChange = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </ThemeProvider>
    );
    return { onPageChange };
  };

  it("renders pagination component correctly", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(12);
  });

  it("displays the correct current page and total pages", () => {
    renderComponent();
    expect(screen.getByText("Página 1 de 10")).toBeInTheDocument();
  });

  it('disables the "<<" button on the first page', () => {
    renderComponent();
    const firstButton = screen.getAllByRole("button")[0];
    expect(firstButton).toBeDisabled();
  });

  it('enables the ">>" button on the first page', () => {
    renderComponent();
    const lastButton = screen.getAllByRole("button")[11];
    expect(lastButton).not.toBeDisabled();
  });

  it("navigates to the correct page on button click", () => {
    const { onPageChange } = renderComponent();
    fireEvent.click(screen.getByText("2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("displays the correct range of page buttons", () => {
    renderComponent();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("updates the page buttons correctly when navigating to later pages", () => {
    renderComponent(6, 10);
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("calls onPageChange with correct page number", () => {
    const { onPageChange } = renderComponent();
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('navigates to the first page when "<<" is clicked', () => {
    const { onPageChange } = renderComponent(5, 10);
    const firstButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('navigates to the last page when ">>" is clicked', () => {
    const { onPageChange } = renderComponent();
    const lastButton = screen.getAllByRole("button")[11];
    fireEvent.click(lastButton);
    expect(onPageChange).toHaveBeenCalledWith(10);
  });
});
