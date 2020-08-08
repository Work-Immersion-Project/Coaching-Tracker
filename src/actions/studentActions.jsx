import {
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_REQUEST,
  ASSIGN_STUDENT_SUBJECT_SUCCESS,
  REMOVE_STUDENT_SUBJECT_REQUEST,
  REMOVE_STUDENT_SUBJECT_SUCCESS,
} from "../types";

import { showAlert, showModal, hideModal } from "./";

import firebase from "firebase";
import { db } from "../firebase";

const studentsCollection = db.collection("students");
const subjectsCollection = db.collection("subjects");

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

// export const getStudents = () => async (dispatch, getState) => {
//   dispatch(getStudentsRequest());
//   studentsCollection.onSnapshot((snapshot) => {
//     dispatch(getStudentsSuccess(snapshot.docs.map((doc) => doc.data())));
//   });
// };
// export const getStudentsBySubject = () => async (dispatch, getState) => {
//   dispatch(getStudentsRequest());
//   try {
//     const studentDocuments = getState().auth.data.user.handledSubjects.map(
//       async (subject) =>
//         await subjectsCollection
//           .doc(subject)
//           .collection("enrolledStudents")
//           .get()
//           .then((snapshot) => snapshot.docs.map((document) => document.data()))
//     );

//     const students = await Promise.all(studentDocuments);
//     const filteredStudents = _.mapKeys(
//       _.flatten(students),
//       (value) => value.email
//     );

//     dispatch(
//       getStudentsSuccess(
//         Object.keys(filteredStudents).map((value) => {
//           return {
//             email: value,
//           };
//         })
//       )
//     );
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };

export const getStudentsRequest = (subjectName = null) => {
  return { type: GET_STUDENTS_REQUEST, payload: { subjectName } };
};

export const getStudentsSuccess = (students) => {
  return { type: GET_STUDENTS_SUCCESS, payload: students };
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
  await studentRef.update({
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

export const addStudentRequest = (formValues) => {
  return { type: ADD_STUDENT_REQUEST, payload: formValues };
};
export const addStudentSuccess = () => {
  return { type: ADD_STUDENT_SUCCESS };
};
