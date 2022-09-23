import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PortalTeams from "./PortalTeams";
import { BrowserRouter } from "react-router-dom";

describe("<PortalTeams />", () => {
  test("it should mount", () => {
    render(<PortalTeams />, { wrapper: BrowserRouter });

    const portalTeams = screen.getByTestId("PortalTeams");

    expect(portalTeams).toBeInTheDocument();
  });
});
