import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { render, screen } from "@testing-library/react";
import NoResults from "./NoResults";

describe("NoResults Component", () => {
  test("renders NoResults component", async () => {
    render(<NoResults name="Test" />);
    expect(screen.getByText(/No results found for/)).toBeInTheDocument();
  });
});
