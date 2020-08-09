import {
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_REQUEST,
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_SUCCESS,
  ASSIGN_SUBJECT_TO_TEACHER_REQUEST,
  ASSIGN_SUBJECT_TO_TEACHER_SUCCESS,
  REMOVE_SUBJECT_FROM_TEACHER_REQUEST,
  REMOVE_SUBJECT_FROM_TEACHER_SUCCESS,
} from "../types";
import _ from "lodash";

export const getTeachersRequest = (filterBySubj) => {
  return { type: GET_TEACHERS_REQUEST, payload: { filterBySubj } };
};
export const getTeachersSuccess = (results) => {
  return {
    type: GET_TEACHERS_SUCCESS,
    data: results,
  };
};

export const addTeacherRequest = (formValues) => {
  return {
    type: ADD_TEACHER_REQUEST,
    payload: formValues,
  };
};
export const addTeacherSuccess = () => {
  return {
    type: ADD_TEACHER_SUCCESS,
  };
};

export const assignSubjectToTeacherRequest = (subjectDetails) => {
  return {
    type: ASSIGN_SUBJECT_TO_TEACHER_REQUEST,
    payload: subjectDetails,
  };
};

export const assignSubjectToTeacherSuccess = () => {
  return {
    type: ASSIGN_SUBJECT_TO_TEACHER_SUCCESS,
  };
};

export const removeSubjectFromTeacherRequest = (subjectDetails) => {
  return {
    type: REMOVE_SUBJECT_FROM_TEACHER_REQUEST,
    payload: subjectDetails,
  };
};
export const removeSubjectFromTeacherSuccess = () => {
  return {
    type: REMOVE_SUBJECT_FROM_TEACHER_SUCCESS,
  };
};
