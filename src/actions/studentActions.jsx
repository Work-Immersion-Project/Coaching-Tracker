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
} from "../types";

import app from "../firebase";
const db = app.firestore();
const userCollection = db.collection("users");

export const getStudent = (studentEmail) => async (dispatch) => {
  const studentDocument = await userCollection.doc(studentEmail).get();
};

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

export const getStudentError = (error) => {
  return {
    type: GET_STUDENT_ERROR,
    data: null,
    error: error,
  };
};

export const getStudents = () => async (dispatch, getState) => {
  dispatch(getStudentsRequest());
  userCollection.where("type", "==", "student").onSnapshot((snapshot) => {
    dispatch(getStudentsSuccess(snapshot.docs.map((doc) => doc.data())));
  });
};

export const getStudentsRequest = () => {
  return { type: GET_STUDENTS_REQUEST };
};

export const getStudentsSuccess = (results) => {
  return { type: GET_STUDENTS_SUCCESS, data: results, error: null };
};

export const getStudentsError = (error) => {
  return { type: GET_STUDENT_ERROR, data: null, error: error };
};

export const addStudent = (values) => async (dispatch) => {};

export const addStudentRequest = () => {
  return { type: ADD_STUDENT_REQUEST };
};
export const addStudentSuccess = (results) => {
  return { type: ADD_STUDENT_SUCCESS };
};
export const addStudentError = (error) => {
  return { type: ADD_STUDENT_ERROR };
};
