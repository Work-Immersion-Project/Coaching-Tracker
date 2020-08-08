import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT_REQUEST,
  AUTH_SIGN_OUT_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN_REQUEST:
    case AUTH_SIGN_OUT_REQUEST:
    case AUTH_SIGN_OUT_SUCCESS:
      return { ...state };
    case AUTH_SIGN_IN_SUCCESS:
      return { ...state, data: action.payload, error: null };
    default:
      return state;
  }
};
