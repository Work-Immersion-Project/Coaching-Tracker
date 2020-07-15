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
  ASSIGN_SUBJECT_TEACHER_REQUEST,
  ASSIGN_SUBJECT_TEACHER_SUCCESS,
} from "../types";
import { hideModal, showModal } from ".";
import { db } from "../firebase";
import firebase from "firebase";

const subjectsCollection = db.collection("subjects");
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
}) => async (dispatch) => {
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(addTeacherRequest());
  try {
    const metadata = {
      fullName: `${firstName} ${middleName} ${lastName}`,
      firstName,
      middleName,
      lastName,
      createdAt,
      lastLoggedIn: null,
    };
    await teachersCollection.doc(email).set({
      metadata,
      email,
      id,
      handledSubjects: [],
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

export const assignSubjectTeacher = (values) => async (dispatch) => {
  const teacherRef = teachersCollection.doc(values.email);
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(assignSubjectTeacherRequest());

  await teacherRef.update({
    handledSubjects: values.subjects.map(({ subjectName }) => subjectName),
  });

  for (const subject of values.subjects) {
    const subjectRef = subjectsCollection.doc(subject.subjectName);
    await subjectRef.update({
      totalTeachers: firebase.firestore.FieldValue.increment(1),
    });
    await subjectRef
      .collection("teachers")
      .doc(values.email)
      .set({ email: values.email });
  }

  dispatch(assignSubjectTeacherSuccess());
  dispatch(
    showModal("SUCCESS_MODAL", {
      onDialogClose: () => dispatch(hideModal()),
      title: "Assignment Success",
      content: `You have successfully assigned subject to teacher.`,
    })
  );
};

export const assignSubjectTeacherRequest = () => {
  return {
    type: ASSIGN_SUBJECT_TEACHER_REQUEST,
  };
};

export const assignSubjectTeacherSuccess = () => {
  return {
    type: ASSIGN_SUBJECT_TEACHER_SUCCESS,
  };
};
