import {
  GET_SUBJECT_FIELDS_SUCCESS,
  GET_SUBJECT_FIELDS_REQUEST,
  GET_STUDENT_FIELDS_REQUEST,
  GET_STUDENT_FIELDS_SUCCESS,
  GET_TEACHER_FIELDS_REQUEST,
  GET_TEACHER_FIELDS_SUCCESS,
} from "../types";

export const getSubjectFieldsRequest = () => {
  return {
    type: GET_SUBJECT_FIELDS_REQUEST,
  };
};

export const getSubjectFieldsSuccess = (subjects) => {
  return {
    type: GET_SUBJECT_FIELDS_SUCCESS,
    payload: subjects,
  };
};

export const getStudentFieldsRequest = (subjectID) => {
  return {
    type: GET_STUDENT_FIELDS_REQUEST,
    payload: subjectID,
  };
};

export const getStudentFieldsSuccess = (students) => {
  return {
    type: GET_STUDENT_FIELDS_SUCCESS,
    payload: students,
  };
};

export const getTeacherFieldsRequest = (subjectID) => {
  return {
    type: GET_TEACHER_FIELDS_REQUEST,
    payload: subjectID,
  };
};

export const getTeacherFieldsSuccess = (teachers) => {
  return {
    type: GET_TEACHER_FIELDS_SUCCESS,
    payload: teachers,
  };
};
