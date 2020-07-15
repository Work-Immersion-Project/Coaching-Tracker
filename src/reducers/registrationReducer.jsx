import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state };
    case REGISTER_USER_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
