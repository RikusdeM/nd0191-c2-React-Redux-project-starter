import {
  saveQuestion,
  saveQuestionAnswer,
  saveQuestionUserUpdate,
} from "../utils/api";
import {
  updateUserAddAnswer,
  updateUserRemoveAnswer,
  updateUserQuestions,
} from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const UNANSWER_QUESTION = "UNANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(questionsText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    // dispatch(showLoading());
    //Todo: Re-add loading

    const updateBackend = async () => {
      try {
        const question = await saveQuestion({
          optionOneText: questionsText.optionOneText,
          optionTwoText: questionsText.optionTwoText,
          author: authedUser,
        });
        const updateUserQ = await saveQuestionUserUpdate({
          authedUser: authedUser,
          qid: question.id,
        });

        dispatch(addQuestion({ [question.id]: question }));
        dispatch(
          updateUserQuestions({
            authedUser: authedUser,
            id: question.id,
          })
        );
      } catch (error) {
        console.error("An error occurred: ", error);
        alert("Could not add Question, please try again")
      }
    };

    return updateBackend();
  };
}

export function answerQuestion({ authedUser, id, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    id,
    answer,
  };
}

export function unanswerQuestion({ authedUser, id, answer }) {
  return {
    type: UNANSWER_QUESTION,
    authedUser,
    id,
    answer,
  };
}

export function handleAnswerQuestion({ authedUser, id, answer }) {
  return (dispatch) => {
    // const { authedUser } = getState();
    dispatch(answerQuestion({ authedUser, id, answer }));
    dispatch(updateUserAddAnswer({ authedUser, id, answer }));

    return saveQuestionAnswer({
      authedUser: authedUser,
      qid: id,
      answer: answer,
    }).catch((e) => {
      console.warn("Error in handleAnswerQuestion: ", e);
      dispatch(unanswerQuestion({ authedUser, id, answer }));
      dispatch(updateUserRemoveAnswer({ authedUser, id }));
      alert("Error answering Poll, please try again");
    });
  };
}
