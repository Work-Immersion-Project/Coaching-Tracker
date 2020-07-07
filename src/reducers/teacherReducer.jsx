import {
  GET_TEACHER_REQUEST,
  GET_TEACHER_ERROR,
  GET_TEACHER_SUCCESS,
  GET_TEACHERS_ERROR,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_REQUEST,
  ADD_TEACHER_ERROR,
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_SUCCESS,
} from "../types";
import _ from "lodash";

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
      return { ...state, data: _.mapKeys(action.data, "email") };
    case ADD_TEACHER_REQUEST:
      return { ...state };
    case ADD_TEACHER_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
