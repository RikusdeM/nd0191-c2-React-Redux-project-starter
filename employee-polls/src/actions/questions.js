import { saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

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

    return saveQuestion({
      optionOneText: questionsText.optionOneText,
      optionTwoText: questionsText.optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion({ [question.id]: question })))
      .catch((error) => console.error(error));

    //   .then(() => dispatch(hideLoading()));
  };
}
