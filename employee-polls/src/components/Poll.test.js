import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { render, screen, fireEvent } from "@testing-library/react";
import { getByAltText, getByClassName } from "@testing-library/dom";
import Poll from "./Poll";
import { store } from "../app/store";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import configureStore from "redux-mock-store";

// const mockStore = configureStore([]);

test("renders a poll", async () => {
  const questionID = "vthrdm985a262al8qx3do";
  let authedUser = "sarahedo";

  //Rather dispatch the intial store data, 
  //as setting up the Mock store with the exact data to replicate this scenario is quite complex

  await store.dispatch(handleInitialData());
  await store.dispatch(setAuthedUser(authedUser));

  //   Mocking initial store state
  //   const initialState = {
  //     authedUser: authedUser,
  //     users: {
  //       [authedUser]: {
  //         id: authedUser,
  //         password: "password123",
  //         name: "Sarah Edo",
  //         avatarURL: "avatar_marilyn_monroe.png",
  //         answers: {
  //           "8xf0y6ziyjabvozdd253nd": "optionOne",
  //           "6ni6ok3ym7mf1p33lnez": "optionOne",
  //           am8ehyc8byjqgar0jgpub9: "optionTwo",
  //           loxhs1bqm25b708cmbf3g: "optionTwo",
  //         },
  //         questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  //       },
  //       tylermcginnis: {
  //         id: 'tylermcginnis',
  //         password:'abc321',
  //         name: 'Tyler McGinnis',
  //         avatarURL: "avatar_bad_breaking_chemisrty_heisenberg.png",
  //         answers: {
  //           "vthrdm985a262al8qx3do": 'optionOne',
  //           "xj352vofupe1dqz9emx13r": 'optionTwo',
  //         },
  //         questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  //       },
  //     },
  //     questions: {
  //       [questionID]: {
  //         id: questionID,
  //         author: "tylermcginnis",
  //         timestamp: 1489579767190,
  //         optionOne: {
  //           votes: ["tylermcginnis"],
  //           text: "take a course on ReactJS",
  //         },
  //         optionTwo: {
  //           votes: ["mtsamis"],
  //           text: "take a course on unit testing with Jest",
  //         },
  //       },
  //     },
  //   };
  //   const store = mockStore(initialState);

  const poll = render(
    <MemoryRouter initialEntries={[`/questions/${questionID}`]}>
      <Provider store={store}>
        <Poll />
      </Provider>
    </MemoryRouter>
  );

  const { users, questions } = store.getState();

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
