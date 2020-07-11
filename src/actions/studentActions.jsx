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
import { hideModal, showModal } from ".";
import { db } from "../firebase";
const studentsCollection = db.collection("students");

export const getStudent = (studentEmail) => async (dispatch) => {
  const studentDocument = await studentsCollection.doc(studentEmail).get();
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
  studentsCollection.onSnapshot((snapshot) => {
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

export const addStudent = ({
  id,
  firstName = "",
  middleName = "",
  lastName = "",
  email,
  createdAt,
}) => async (dispatch) => {
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(addStudentRequest());
  try {
    const metadata = {
      firstName,
      middleName,
      lastName,
      createdAt,
      lastLoggedIn: null,
    };
    await studentsCollection.doc(email).set({
      metadata,
      email,
      id,
    });

    dispatch(
      showModal("SUCCESS_MODAL", {
        onDialogClose: () => dispatch(hideModal()),
        title: "Student Added!",
        content: `You have successfully added ${firstName} ${lastName}`,
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(hideModal());
    dispatch(addStudentSuccess());
  } catch (error) {
    console.log(error);
    dispatch(hideModal());
  }
};

export const addStudentRequest = () => {
  return { type: ADD_STUDENT_REQUEST };
};
export const addStudentSuccess = () => {
  return { type: ADD_STUDENT_SUCCESS };
};
export const addStudentError = (error) => {
  return { type: ADD_STUDENT_ERROR };
};
