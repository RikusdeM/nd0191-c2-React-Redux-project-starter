import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { expect, describe, it } from "@jest/globals";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { store } from "../app/store";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";

describe("Dashboard", () => {
  it("will match the snapshot", async () => {
    /* Configure the store with the same static initial Data and authed user. 
    The component should render the same when the initial data with 
    the same authedUser is used.
    */
    const authedUser = "sarahedo";

    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser(authedUser));

    const dashboard = render(
      <MemoryRouter initialEntries={[`/`]}>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </MemoryRouter>
    );
    expect(dashboard).toMatchSnapshot();
  });
});
