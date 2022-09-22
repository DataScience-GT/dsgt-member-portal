import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DocsSidebarItem from "./DocsSidebarItem";
import { BrowserRouter } from "react-router-dom";

describe("<DocsSidebarItem />", () => {
  test("it should mount", () => {
    render(<DocsSidebarItem />, { wrapper: BrowserRouter });

    const docsSidebarItem = screen.getByTestId("DocsSidebarItem");

    expect(docsSidebarItem).toBeInTheDocument();
  });
});
