import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ScrollableList from "./ScrollableList";

describe("<ScrollableList />", () => {
  test("it should mount", () => {
    render(<ScrollableList />);
    const scrollableList = screen.getByTestId("ScrollableList");
    expect(scrollableList).toBeInTheDocument();
  });
  test("it should show Nothing when no elements provided", () => {
    render(<ScrollableList />);
    const scrollableList = screen.getByTestId("ScrollableList");
    expect(scrollableList.textContent).toContain("Nothing to show here :(");
  });
  test("it should show elements when elements provided", () => {
    let vals = ["a", "b", "c", "d", "b", "c", "c"];
    render(<ScrollableList values={vals} />);
    const scrollableList = screen.getByTestId("ScrollableList");
    expect(scrollableList.textContent).not.toContain("Nothing to show here :(");
    // expect(screen).not.toContainElement(Nothing);
    vals.forEach((val) => {
      expect(scrollableList.textContent).toContain(val);
    });
  });
});
