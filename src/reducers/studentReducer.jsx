import {
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_SUCCESS,
  ASSIGN_STUDENT_SUBJECT_REQUEST,
} from "../types";

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
    case ASSIGN_STUDENT_SUBJECT_SUCCESS:
      return { ...state };
    case ASSIGN_STUDENT_SUBJECT_REQUEST:
      return { ...state };
    default:
      return state;
  }
};
