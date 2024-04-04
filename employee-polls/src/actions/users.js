export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USER_ADD_ANSWER = "UPDATE_USER_ADD_ANSWER";
export const UPDATE_USER_REMOVE_ANSWER = "UPDATE_USER_REMOVE_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function updateUserAddAnswer({ authedUser, id, answer }) {
  return {
    type: UPDATE_USER_ADD_ANSWER,
    authedUser,
    id,
    answer,
  };
}
export function updateUserRemoveAnswer({ authedUser, id, answer }) {
  return {
    type: UPDATE_USER_REMOVE_ANSWER,
    authedUser,
    id,
  };
}
