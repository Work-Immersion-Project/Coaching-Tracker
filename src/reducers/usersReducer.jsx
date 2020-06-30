import { GET_USER, ADD_USER } from "../actions/types";

const INITIAL_STATE = {
  currentUser: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.payload };
    case ADD_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
