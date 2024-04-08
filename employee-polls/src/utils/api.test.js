import { expect, describe, it } from "@jest/globals";
import { saveQuestionUserUpdate } from "./api";
import { _saveQuestion } from "./_DATA";
import { _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("should return the formatted saved Question if it is passed the needed arguments", async () => {
    const author = "mtsamis";
    const question = {
      optionOneText: "to be",
      optionTwoText: "or not to be",
      author: author,
    };
    const desiredSavedQuestion = {
      id: expect.any(String),
      timestamp: expect.any(Number),
      author: author,
      optionOne: {
        votes: [],
        text: question.optionOneText,
      },
      optionTwo: {
        votes: [],
        text: question.optionTwoText,
      },
    };
    const result = await _saveQuestion(question);

    expect(result).toEqual(desiredSavedQuestion);
  });

  it("should fail with a failure message, when the invalid arguments are passed", async () => {
    const author = "mtsamis";
    const optionOne = "opt1";
    const optionTwo = "opt2";
    const failureMsg =
      "Please provide optionOneText, optionTwoText, and author";

    await expect(_saveQuestion(author)).rejects.toEqual(failureMsg);
    await expect(_saveQuestion(author, optionOne)).rejects.toEqual(failureMsg);
    await expect(_saveQuestion(optionTwo, author)).rejects.toEqual(failureMsg);
    await expect(_saveQuestion(optionOne, optionTwo)).rejects.toEqual(
      failureMsg
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true, when the correct argements are passed", async () => {
    const authedUser = "tylermcginnis";
    const qid = "am8ehyc8byjqgar0jgpub9";
    const answer = "optionOne";

    const result = await _saveQuestionAnswer({ authedUser, qid, answer });

    expect(result).toEqual(true);
  });

  it("should fail with a failure message, when the incorrect arguments are passed", async () => {
    const authedUser = "tylermcginnis";
    const qid = "am8ehyc8byjqgar0jgpub9";
    const failureMsg = "Please provide authedUser, qid, and answer";

    await expect(_saveQuestionAnswer({ authedUser })).rejects.toEqual(
      failureMsg
    );
    await expect(_saveQuestionAnswer({ authedUser, qid })).rejects.toEqual(
      failureMsg
    );
  });
});

describe("saveQuestionsUserUpdate", () => {
  it("should return true if the correct arguments are passed", async () => {
    const authedUser = "sarahedo";
    const qid = "loxhs1bqm25b708cmbf3g";

    const result = await saveQuestionUserUpdate({ authedUser, qid });

    expect(result).toEqual(true);
  });

  it("should fail with a failure message, when the wrong arguments are passed", async () => {
    const authedUser = "sarahedo";
    const qid = "loxhs1bqm25b708cmbf3g";
    const failureMsg = "Please provide authedUser and qid";

    await expect(saveQuestionUserUpdate({ authedUser })).rejects.toEqual(
      failureMsg
    );
    await expect(saveQuestionUserUpdate({ qid })).rejects.toEqual(failureMsg);
  });
});
