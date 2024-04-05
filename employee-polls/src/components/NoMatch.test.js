import { render, screen } from "@testing-library/react";
import NoMatch from "./NoMatch";
import { expect, test, describe, it } from "@jest/globals";

describe("NoMatch", () => {
  it("will match the snapshot", () => {
    const component = render(<NoMatch />);
    expect(component).toMatchSnapshot();
  });
});
