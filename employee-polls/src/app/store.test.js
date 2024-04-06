import { expect, describe, it } from "@jest/globals";
import { handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import { store } from "./store";

describe("testStore", () => {
  it("should test the state of the Redux store against the mockStore data after it was dispatched", async () => {
    const authedUser = "sarahedo";

    await store.dispatch(handleInitialData());
    await store.dispatch(setAuthedUser(authedUser));

    const storeState = store.getState();

    const mockStoreData = {
      authedUser: authedUser,
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: "avatar_marilyn_monroe.png",
          answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
            am8ehyc8byjqgar0jgpub9: "optionTwo",
            loxhs1bqm25b708cmbf3g: "optionTwo",
          },
          questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
        },
        tylermcginnis: {
          id: "tylermcginnis",
          password: "abc321",
          name: "Tyler McGinnis",
          avatarURL: "avatar_bad_breaking_chemisrty_heisenberg.png",
          answers: {
            vthrdm985a262al8qx3do: "optionOne",
            xj352vofupe1dqz9emx13r: "optionTwo",
          },
          questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
        },
        mtsamis: {
          id: "mtsamis",
          password: "xyz123",
          name: "Mike Tsamis",
          avatarURL: "avatar_batman.png",
          answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
            vthrdm985a262al8qx3do: "optionTwo",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
          },
          questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
        },
        zoshikanlu: {
          id: "zoshikanlu",
          password: "pass246",
          name: "Zenobia Oshikanlu",
          avatarURL: "avatar_coffee_cup_zorro.png",
          answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
          },
          questions: [],
        },
      },

      questions: {
        "8xf0y6ziyjabvozdd253nd": {
          id: "8xf0y6ziyjabvozdd253nd",
          author: "sarahedo",
          timestamp: 1467166872634,
          optionOne: {
            votes: ["sarahedo"],
            text: "Build our new application with Javascript",
          },
          optionTwo: {
            votes: [],
            text: "Build our new application with Typescript",
          },
        },
        "6ni6ok3ym7mf1p33lnez": {
          id: "6ni6ok3ym7mf1p33lnez",
          author: "mtsamis",
          timestamp: 1468479767190,
          optionOne: {
            votes: [],
            text: "hire more frontend developers",
          },
          optionTwo: {
            votes: ["mtsamis", "sarahedo"],
            text: "hire more backend developers",
          },
        },
        am8ehyc8byjqgar0jgpub9: {
          id: "am8ehyc8byjqgar0jgpub9",
          author: "sarahedo",
          timestamp: 1488579767190,
          optionOne: {
            votes: [],
            text: "conduct a release retrospective 1 week after a release",
          },
          optionTwo: {
            votes: ["sarahedo"],
            text: "conduct release retrospectives quarterly",
          },
        },
        loxhs1bqm25b708cmbf3g: {
          id: "loxhs1bqm25b708cmbf3g",
          author: "tylermcginnis",
          timestamp: 1482579767190,
          optionOne: {
            votes: [],
            text: "have code reviews conducted by peers",
          },
          optionTwo: {
            votes: ["sarahedo"],
            text: "have code reviews conducted by managers",
          },
        },
        vthrdm985a262al8qx3do: {
          id: "vthrdm985a262al8qx3do",
          author: "tylermcginnis",
          timestamp: 1489579767190,
          optionOne: {
            votes: ["tylermcginnis"],
            text: "take a course on ReactJS",
          },
          optionTwo: {
            votes: ["mtsamis"],
            text: "take a course on unit testing with Jest",
          },
        },
        xj352vofupe1dqz9emx13r: {
          id: "xj352vofupe1dqz9emx13r",
          author: "mtsamis",
          timestamp: 1493579767190,
          optionOne: {
            votes: ["mtsamis", "zoshikanlu"],
            text: "deploy to production once every two weeks",
          },
          optionTwo: {
            votes: ["tylermcginnis"],
            text: "deploy to production once every month",
          },
        },
      },
    };

    expect(JSON.stringify(storeState)).toEqual(JSON.stringify(mockStoreData));
  });
});
