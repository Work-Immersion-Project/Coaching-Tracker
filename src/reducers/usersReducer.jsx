import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
} from "../types";

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: action.error,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        data: action.data,
        error: action.error,
      };
    case ADD_USER_REQUEST:
      return {
        ...state,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case ADD_USER_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
