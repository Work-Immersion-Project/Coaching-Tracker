import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
} from "../types";

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state };
    case SIGN_IN_SUCCESS:
      return { ...state, data: action.data, error: null };
    case SIGN_IN_ERROR:
      return { ...state, data: null, error: action.error };
    case SIGN_OUT_REQUEST:
      return { ...state };
    case SIGN_OUT_SUCCESS:
      return { ...state, data: action.data, error: null };
    case SIGN_OUT_ERROR:
      return { ...state, data: null, error: action.error };
    default:
      return state;
  }
};
