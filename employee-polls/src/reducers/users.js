import {
  RECEIVE_USERS,
  UPDATE_USER_ADD_ANSWER,
  UPDATE_USER_REMOVE_ANSWER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_USER_ADD_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.id]: action.answer,
          },
        },
      };
    case UPDATE_USER_REMOVE_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: Object.keys(state[action.authedUser].answers).filter(
            (id) => id !== action.id
          ),
        },
      };
    default:
      return state;
  }
}
