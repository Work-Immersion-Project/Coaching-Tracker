import {
  ADD_SUBJECT_REQUEST,
  ADD_SUBJECT_SUCCESS,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
} from "../types";
import { db } from "../firebase";

const subjectsCollection = db.collection("subjects");

export const addSubject = (values) => async (dispatch) => {
  dispatch(addSubjectRequest());
  try {
    subjectsCollection
      .doc(values.subject_name)
      .set({ ...values, enrolledStudents: [], teachers: [] });
    dispatch(addSubjectSuccess());
  } catch (error) {}
};

export const addSubjectRequest = () => {
  return {
    type: ADD_SUBJECT_REQUEST,
  };
};

export const addSubjectSuccess = () => {
  return {
    type: ADD_SUBJECT_SUCCESS,
  };
};

export const getSubjects = () => async (dispatch) => {
  dispatch(getSubjectsRequest());

  subjectsCollection.onSnapshot((snapshot) => {
    dispatch(getSubjectsSuccess(snapshot.docs.map((doc) => doc.data())));
  });
};

export const getSubjectsRequest = () => {
  return {
    type: GET_SUBJECTS_REQUEST,
  };
};

export const getSubjectsSuccess = (results) => {
  console.log(results);
  return {
    type: GET_SUBJECTS_SUCCESS,
    data: results,
  };
};
