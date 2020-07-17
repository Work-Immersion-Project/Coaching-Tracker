import {
  GET_TEACHER_REQUEST,
  GET_TEACHER_SUCCESS,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_REQUEST,
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TEACHER_REQUEST:
      return { ...state };
    case GET_TEACHER_SUCCESS:
      return { ...state, data: action.data };
    case GET_TEACHERS_REQUEST:
      return { ...state };
    case GET_TEACHERS_SUCCESS:
      return { ...state, data: action.data };
    case ADD_TEACHER_REQUEST:
      return { ...state };
    case ADD_TEACHER_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
