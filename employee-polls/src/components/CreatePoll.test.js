import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { store } from "../app/store";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import CreatePoll from "./CreatePoll";
import { MemoryRouter } from "react-router";
import { expect, describe, it, beforeAll } from "@jest/globals";

const authedUser = "sarahedo";
beforeAll(async () => {
  //Setup the store with the initial data
  await store.dispatch(handleInitialData());
  await store.dispatch(setAuthedUser(authedUser));
});

describe("CreatePoll", () => {
  it("creates a Poll and checks the state of the UI and Redux store ", async () => {
    const originalStoreState = store.getState();
    const originalAuthedUserQuestions =
      originalStoreState.users[authedUser].questions;

    const createPoll = render(
      <MemoryRouter initialEntries={[`/add`]}>
        <Provider store={store}>
          <CreatePoll />
        </Provider>
      </MemoryRouter>
    );

    expect(createPoll.queryAllByText(/Option/i).length).toEqual(2);

    const submitBtn = createPoll.getByTestId("submit-btn");
    expect(submitBtn.disabled).toBe(true);

    const optionOneTextField = createPoll.getByPlaceholderText("Option One");
    const optionTwoTextField = createPoll.getByPlaceholderText("Option Two");

    const optA = "optA";
    const optB = "optB";

    fireEvent.change(optionOneTextField, { target: { value: optA } });
    fireEvent.change(optionTwoTextField, { target: { value: optB } });

    expect(submitBtn.disabled).toBe(false);

    fireEvent.click(submitBtn);

    // Wait for the side-effects of the fireEvent to completei.e "dispatch(handleAddQuestion(newQuestion))"
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const tempStore = store.getState();

    //Now that the fireEvent dispatched the addQuestion action, we should expect the changes in the store
    expect(tempStore.users[authedUser].questions.length).toEqual(
      originalAuthedUserQuestions.length + 1
    );
  });
});
