import {
  ADD_SUBJECT_REQUEST,
  ADD_SUBJECT_SUCCESS,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
} from "../types";

export const addSubjectRequest = (subjectDetails) => {
  return {
    type: ADD_SUBJECT_REQUEST,
    payload: subjectDetails,
  };
};

export const addSubjectSuccess = () => {
  return {
    type: ADD_SUBJECT_SUCCESS,
  };
};
export const getSubjectsRequest = () => {
  return {
    type: GET_SUBJECTS_REQUEST,
  };
};

export const getSubjectsSuccess = (results) => {
  return {
    type: GET_SUBJECTS_SUCCESS,
    data: results,
  };
};
