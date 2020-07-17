import {
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_ERROR,
  ADD_STUDENT_SUCCESS,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_ERROR,
  GET_STUDENT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_SUCCESS,
  REMOVE_STUDENT_SUBJECT_REQUEST,
  REMOVE_STUDENT_SUBJECT_SUCCESS,
} from "../types";

import { showAlert, showModal, hideModal } from "./";
import firebase from "firebase";
import { db } from "../firebase";
import _ from "lodash";
const studentsCollection = db.collection("students");
const subjectsCollection = db.collection("subjects");

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
export const getStudentsBySubject = () => async (dispatch, getState) => {
  dispatch(getStudentsRequest());
  const studentDocuments = getState().auth.data.user.handledSubjects.map(
    async (subject) =>
      await subjectsCollection
        .doc(subject)
        .collection("enrolledStudents")
        .get()
        .then((snapshot) => snapshot.docs.map((document) => document.data()))
  );

  const students = await Promise.all(studentDocuments);
  const filteredStudents = _.mapKeys(
    _.flatten(students),
    (value) => value.email
  );

  dispatch(
    getStudentsSuccess(
      Object.keys(filteredStudents).map((value) => {
        return {
          email: value,
        };
      })
    )
  );
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
      fullName: `${firstName} ${middleName} ${lastName}`,
      firstName,
      middleName,
      lastName,
      createdAt,
      lastLoggedIn: null,
    };
    const coachingStats = {
      pending: 0,
      finished: 0,
      canceled: 0,
    };

    await studentsCollection.doc(email).set({
      metadata,
      email,
      id,
      enrolledSubjects: [],
      coachingStats,
    });

    dispatch(hideModal());
    dispatch(addStudentSuccess());
    dispatch(
      showAlert("SUCCESS", `Student ${metadata.fullName} has been added!`)
    );
  } catch (error) {
    dispatch(showAlert("ERROR", error));
  }
};

export const assignStudentSubjects = (values) => async (dispatch) => {
  const fieldValue = firebase.firestore.FieldValue;
  const studentRef = studentsCollection.doc(values.email);
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(assignStudentsSubjectsRequest());

  await db.runTransaction(async (transaction) => {
    transaction.update(studentRef, {
      enrolledSubjects: values.subjects.map(({ subjectName }) => subjectName),
    });

    values.subjects.forEach((subject) => {
      const subjectRef = subjectsCollection.doc(subject.subjectName);

      const enrolledStudentRef = subjectRef
        .collection("enrolledStudents")
        .doc(values.email);

      transaction.update(subjectRef, {
        totalStudentsEnrolled: fieldValue.increment(1),
      });

      transaction.set(enrolledStudentRef, {
        email: values.email,
        fullName: values.metadata.fullName,
      });
    });
  });

  dispatch(hideModal());
  dispatch(
    showAlert(
      "SUCCESS",
      `Student has been enrolled to Subjects: ${values.subjects.map(
        (subject) => subject.subjectName
      )}`
    )
  );
};
export const assignStudentsSubjectsRequest = () => {
  return {
    type: ASSIGN_STUDENT_SUBJECT_REQUEST,
  };
};
export const assignStudentsSubjectsSuccess = () => {
  return {
    type: ASSIGN_STUDENT_SUBJECT_SUCCESS,
  };
};

export const removeStudentSubject = (
  { email, metadata },
  subjectName
) => async (dispatch) => {
  const fieldValue = firebase.firestore.FieldValue;
  const studentRef = studentsCollection.doc(email);
  const subjectRef = subjectsCollection.doc(subjectName);
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(removeStudentSubjectRequest());
  studentRef.update({
    enrolledSubjects: fieldValue.arrayRemove(subjectName),
  });

  await db.runTransaction(async (transaction) => {
    const enrolledStudentRef = subjectRef
      .collection("enrolledStudents")
      .doc(email);
    transaction.delete(enrolledStudentRef);
    transaction.update(subjectRef, {
      totalStudentsEnrolled: fieldValue.increment(-1),
    });
  });

  dispatch(hideModal());
  dispatch(removeStudentSubjectSuccess());
  dispatch(
    showAlert(
      "SUCCESS",
      `Subject ${subjectName} has been unassigned from ${metadata.fullName}.`
    )
  );
};

export const removeStudentSubjectRequest = () => {
  return {
    type: REMOVE_STUDENT_SUBJECT_REQUEST,
  };
};

export const removeStudentSubjectSuccess = () => {
  return {
    type: REMOVE_STUDENT_SUBJECT_SUCCESS,
  };
};

export const addStudentRequest = () => {
  return { type: ADD_STUDENT_REQUEST };
};
export const addStudentSuccess = () => {
  return { type: ADD_STUDENT_SUCCESS };
};
