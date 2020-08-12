import {
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_SUCCESS,
  REMOVE_STUDENT_SUBJECT_REQUEST,
  REMOVE_STUDENT_SUBJECT_SUCCESS,
} from "../types";

export const getStudentRequest = () => {
  return {
    type: GET_STUDENT_REQUEST,
  };
};
export const getStudentSuccess = (results) => {
  return {
    type: GET_STUDENT_SUCCESS,
    data: results,
    error: null,
  };
};

export const getStudentsRequest = (filterBySubject) => {
  return { type: GET_STUDENTS_REQUEST, payload: { filterBySubject } };
};

export const getStudentsSuccess = (students) => {
  return { type: GET_STUDENTS_SUCCESS, payload: students };
};

export const assignStudentsSubjectsRequest = (formValues) => {
  return {
    type: ASSIGN_STUDENT_SUBJECT_REQUEST,
    payload: formValues,
  };
};
export const assignStudentsSubjectsSuccess = () => {
  return {
    type: ASSIGN_STUDENT_SUBJECT_SUCCESS,
  };
};
export const removeStudentSubjectRequest = (formValues) => {
  return {
    type: REMOVE_STUDENT_SUBJECT_REQUEST,
    payload: formValues,
  };
};

export const removeStudentSubjectSuccess = () => {
  return {
    type: REMOVE_STUDENT_SUBJECT_SUCCESS,
  };
};

export const addStudentRequest = (formValues) => {
  return { type: ADD_STUDENT_REQUEST, payload: formValues };
};
export const addStudentSuccess = () => {
  return { type: ADD_STUDENT_SUCCESS };
};
