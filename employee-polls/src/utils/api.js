import {
  _getQuestions,
  _getUsers,
  _saveQuestionAnswer,
  _saveQuestion,
  _saveQuestionUserUpdate,
} from "./_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
    users,
    questions,
  }));
}

export function saveQuestionUserUpdate(info){
  return _saveQuestionUserUpdate(info);
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}
