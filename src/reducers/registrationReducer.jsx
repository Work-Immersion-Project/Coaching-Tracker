import {
  REGISTRATION_REGISTER_USER_REQUEST,
  REGISTRATION_REGISTER_USER_SUCCESS,
} from "../types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTRATION_REGISTER_USER_REQUEST:
    case REGISTRATION_REGISTER_USER_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
