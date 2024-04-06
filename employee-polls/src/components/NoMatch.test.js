import { render } from "@testing-library/react";
import NoMatch from "./NoMatch";
import { expect, describe, it } from "@jest/globals";

describe("NoMatch", () => {
  it("will match the snapshot", () => {
    const noMatch = render(<NoMatch />);
    expect(noMatch).toMatchSnapshot();
  });
});
