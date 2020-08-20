import {
  GET_SUBJECT_FIELDS_SUCCESS,
  GET_SUBJECT_FIELDS_REQUEST,
  GET_STUDENT_FIELDS_REQUEST,
  GET_TEACHER_FIELDS_REQUEST,
  GET_STUDENT_FIELDS_SUCCESS,
  GET_TEACHER_FIELDS_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  data: {
    subjectFields: [],
    teacherFields: [],
    studentFields: [],
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUBJECT_FIELDS_REQUEST:
    case GET_STUDENT_FIELDS_REQUEST:
    case GET_TEACHER_FIELDS_REQUEST:
      return { ...state };
    case GET_SUBJECT_FIELDS_SUCCESS:
      return {
        ...state,
        data: {
          subjectFields: action.payload,
        },
      };
    case GET_STUDENT_FIELDS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          studentFields: action.payload,
        },
      };
    case GET_TEACHER_FIELDS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          teacherFields: action.payload,
        },
      };
    default:
      return state;
  }
};
