import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { render, fireEvent } from "@testing-library/react";
import Poll from "./Poll";
import { store } from "../app/store";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";

const authedUser = "sarahedo";
beforeAll(async () => {
  /*Note: No need to setup mock store with exact scnenario, as we can dispatch the initial data.
    The store.test.js test ensures us the store behaving correctly when these actions are dispatched
    */
  await store.dispatch(handleInitialData());
  await store.dispatch(setAuthedUser(authedUser));
});

describe("Poll", () => {
  it("will render a poll and check if the UI changes after voting", () => {
    const questionID = "vthrdm985a262al8qx3do";

    const poll = render(
      <MemoryRouter initialEntries={[`/questions/${questionID}`]}>
        <Provider store={store}>
          <Poll />
        </Provider>
      </MemoryRouter>
    );

    const { users } = store.getState();

    const questionAlreadyAnswered = Object.keys(
      users[authedUser].answers
    ).includes(questionID);

    expect(questionAlreadyAnswered).toEqual(false);

    expect(poll.getByText(/Poll by/i)).toBeInTheDocument();
    expect(poll.getByText(/Would you Rather/i)).toBeInTheDocument();
    expect(
      poll.container.getElementsByClassName("avatar")[0]
    ).toBeInTheDocument();

    //Test components on unanswered Poll
    expect(poll.getByTestId("vote-option-one")).toBeInTheDocument();
    expect(poll.getByTestId("vote-option-two")).toBeInTheDocument();

    const optOneVoteBtn = poll.getByTestId("vote-option-one");
    fireEvent.click(optOneVoteBtn);

    //Test components on answered Poll
    expect(poll.getByTestId("option-one-badge-a")).toBeInTheDocument();
    expect(poll.getByTestId("option-one-badge-b")).toBeInTheDocument();
    expect(poll.getByTestId("option-two-badge-a")).toBeInTheDocument();
    expect(poll.getByTestId("option-one-badge-b")).toBeInTheDocument();
    expect(poll.getByText(/My Answer/i)).toBeInTheDocument();
  });
});
