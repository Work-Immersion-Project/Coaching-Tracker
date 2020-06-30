import { GET_USER, ADD_USER } from "../actions/types";

const INITIAL_STATE = {
  currentUser: null,
  accessToken: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        accessToken: action.payload.accessToken,
      };
    case ADD_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};
