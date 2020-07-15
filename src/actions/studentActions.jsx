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
} from "../types";
import { hideModal, showModal } from ".";
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
    await studentsCollection.doc(email).set({
      metadata,
      email,
      id,
      enrolledSubjects: [],
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

export const assignStudentSubjects = (values) => async (dispatch) => {
  const studentRef = studentsCollection.doc(values.email);
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(assignStudentsSubjectsRequest());

  await studentRef.update({
    enrolledSubjects: values.subjects.map(({ subjectName }) => subjectName),
  });

  for (const subject of values.subjects) {
    const subjectRef = subjectsCollection.doc(subject.subjectName);
    await subjectRef.update({
      totalEnrolledStudents: firebase.firestore.FieldValue.increment(1),
    });
    await subjectRef
      .collection("enrolledStudents")
      .doc(values.email)
      .set({ email: values.email });
  }

  dispatch(assignStudentsSubjectsSuccess());
  dispatch(
    showModal("SUCCESS_MODAL", {
      onDialogClose: () => dispatch(hideModal()),
      title: "Assignment Success",
      content: `You have successfully assigned subject to student.`,
    })
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

export const addStudentRequest = () => {
  return { type: ADD_STUDENT_REQUEST };
};
export const addStudentSuccess = () => {
  return { type: ADD_STUDENT_SUCCESS };
};
export const addStudentError = (error) => {
  return { type: ADD_STUDENT_ERROR };
};
