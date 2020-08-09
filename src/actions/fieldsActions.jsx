import {
  GET_SUBJECT_FIELDS_SUCCESS,
  GET_SUBJECT_FIELDS_REQUEST,
} from "../types";

export const getSubjectFieldsRequest = () => {
  return {
    type: GET_SUBJECT_FIELDS_REQUEST,
  };
};

export const getSubjectFieldsSuccess = (results) => {
  return {
    type: GET_SUBJECT_FIELDS_SUCCESS,
    data: results,
  };
};
