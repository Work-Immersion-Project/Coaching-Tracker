import {
  GET_TEACHER_REQUEST,
  GET_TEACHER_ERROR,
  GET_TEACHER_SUCCESS,
  GET_TEACHERS_ERROR,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_REQUEST,
  ADD_TEACHER_ERROR,
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_SUCCESS,
} from "../types";
import { hideModal, showModal } from ".";
import { db } from "../firebase";

const teachersCollection = db.collection("teachers");

export const getTeacher = (teacherEmail) => async (dispatch) => {
  dispatch(getTeacherRequest());
  try {
    const teacherDocument = await teachersCollection.doc(teacherEmail).get();
    dispatch(getTeacherSuccess(teacherDocument.data()));
  } catch (error) {}
};

export const getTeacherRequest = () => {
  return {
    type: GET_TEACHER_REQUEST,
  };
};

export const getTeacherSuccess = (results) => {
  return {
    type: GET_TEACHER_SUCCESS,
    data: results,
  };
};

export const getTeachers = () => async (dispatch) => {
  dispatch(getTeachersRequest());
  teachersCollection.onSnapshot((snapshot) => {
    dispatch(
      getTeachersSuccess(snapshot.docs.map((document) => document.data()))
    );
  });
};

export const getTeachersRequest = () => {
  return { type: GET_TEACHERS_REQUEST };
};
export const getTeachersSuccess = (results) => {
  return {
    type: GET_TEACHERS_SUCCESS,
    data: results,
  };
};

export const addTeacher = ({
  email,
  firstName,
  middleName,
  lastName,
  id,
  createdAt,
}) => async (dispatch, getState) => {
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(addTeacherRequest());
  try {
    const metadata = {
      firstName,
      middleName,
      lastName,
      createdAt,
    };
    await teachersCollection.doc(email).set({
      metadata,
      email,
      id,
    });

    dispatch(
      showModal("SUCCESS_MODAL", {
        onDialogClose: () => dispatch(hideModal()),
        title: "Teacher Added!",
        content: `You have successfully added ${firstName} ${lastName}`,
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(hideModal());

    dispatch(addTeacherSuccess());
  } catch (error) {
    return {
      type: "ADD_TEACHER_ERROR",
      error: error,
    };
  }
};

export const addTeacherRequest = () => {
  return {
    type: ADD_TEACHER_REQUEST,
  };
};
export const addTeacherSuccess = () => {
  return {
    type: ADD_TEACHER_SUCCESS,
  };
};
