import {
  GET_SUBJECT_FIELDS_SUCCESS,
  GET_SUBJECT_FIELDS_REQUEST,
} from "../types";
import { setError } from "../actions";
import { db } from "../firebase";

const subjectCollection = db.collection("subjects");

export const getSubjectFields = () => async (dispatch) => {
  dispatch(getSubjectFieldsRequest());
  try {
    const subjects = await subjectCollection.get().then((querySnapshot) => {
      return querySnapshot.docs.map((document) => document.data());
    });
    dispatch(getSubjectFieldsSuccess(subjects));
  } catch (error) {
    setError(error);
  }
};

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
