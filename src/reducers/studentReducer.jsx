import {
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_ERROR,
  ADD_STUDENT_SUCCESS,
  GET_STUDENTS_ERROR,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_ERROR,
  GET_STUDENT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_SUCCESS,
  ASSIGN_STUDENT_SUBJECT_REQUEST,
} from "../types";

import _ from "lodash";
const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_STUDENT_REQUEST:
      return { ...state };
    case GET_STUDENTS_SUCCESS:
      return { ...state, data: action.data };
    case GET_STUDENTS_REQUEST:
      return { ...state };
    case GET_STUDENTS_SUCCESS:
      return { ...state, data: _.mapKeys(action.data, "email") };
    case ASSIGN_STUDENT_SUBJECT_SUCCESS:
      return { ...state };
    case ASSIGN_STUDENT_SUBJECT_REQUEST:
      return { ...state };
    default:
      return state;
  }
};
