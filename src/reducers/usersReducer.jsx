import { GET_USER, ADD_USER } from "../types";

const INITIAL_STATE = {
  currentUser: null,
  userToken: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        userToken: action.payload.userToken,
      };
    case ADD_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        userToken: action.payload.userToken,
      };
    default:
      return state;
  }
};
