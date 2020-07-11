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
import { db } from "../firebase";

const usersCollection = db.collection("users");

export const getTeacher = (teacherEmail) => async (dispatch) => {
  dispatch(getTeacherRequest());
  try {
    const teacherDocument = await usersCollection.doc(teacherEmail).get();
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
  usersCollection.where("type", "==", "teacher").onSnapshot((snapshot) => {
    dispatch(getTeachersSuccess(snapshot.docs.map((doc) => doc.data())));
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
