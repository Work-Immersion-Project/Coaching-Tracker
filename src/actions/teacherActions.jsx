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
  REMOVE_SUBJECT_TEACHER_REQUEST,
  REMOVE_SUBJECT_TEACHER_SUCCESS,
} from "../types";
import { hideModal, showModal, showNotification } from ".";
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
      showNotification(
        "SUCCESS",
        `Teacher ${metadata.fullName} has been added!`
      )
    );

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
  const fieldValue = firebase.firestore.FieldValue;
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(assignSubjectTeacherRequest());

  await db.runTransaction(async (transaction) => {
    transaction.update(teacherRef, {
      handledSubjects: values.subjects.map(({ subjectName }) => subjectName),
    });

    values.subjects.forEach((subject) => {
      const subjectRef = subjectsCollection.doc(subject.subjectName);
      const teacherCollectionRef = subjectRef
        .collection("teachers")
        .doc(values.email);

      transaction.update(subjectRef, {
        totalTeachers: fieldValue.increment(1),
      });

      transaction.set(teacherCollectionRef, {
        email: values.email,
      });
    });
  });

  dispatch(assignSubjectTeacherSuccess());
  dispatch(hideModal());
  dispatch(
    showNotification(
      "SUCCESS",
      `You have successfully assigned subject/s:  ${values.subjects.map(
        (subject) => subject.subjectName
      )} `
    )
  );
};

const assignSubjectTeacherRequest = () => {
  return {
    type: ASSIGN_SUBJECT_TEACHER_REQUEST,
  };
};

const assignSubjectTeacherSuccess = () => {
  return {
    type: ASSIGN_SUBJECT_TEACHER_SUCCESS,
  };
};

export const removeSubjectTeacher = (
  { email, metadata },
  subjectName
) => async (dispatch) => {
  const fieldValue = firebase.firestore.FieldValue;
  const teacherRef = teachersCollection.doc(email);
  const subjectRef = subjectsCollection.doc(subjectName);
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(removeSubjectTeacherRequest());
  teacherRef.update({
    handledSubjects: fieldValue.arrayRemove(subjectName),
  });

  await db.runTransaction(async (transaction) => {
    const teachersRef = subjectRef.collection("teachers").doc(email);
    transaction.delete(teachersRef);
    transaction.update(subjectRef, {
      totalStudentsEnrolled: fieldValue.increment(-1),
    });
  });

  dispatch(hideModal());
  dispatch(removeSubjectTeacherSuccess());
  dispatch(
    showNotification(
      "SUCCESS",
      `Subject ${subjectName} has been unassigned from ${metadata.fullName}.`
    )
  );
};

const removeSubjectTeacherRequest = () => {
  return {
    type: REMOVE_SUBJECT_TEACHER_REQUEST,
  };
};
const removeSubjectTeacherSuccess = () => {
  return {
    type: REMOVE_SUBJECT_TEACHER_SUCCESS,
  };
};
