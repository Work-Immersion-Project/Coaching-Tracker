import {
  ADD_SUBJECT_REQUEST,
  ADD_SUBJECT_SUCCESS,
  GET_SUBJECTS_REQUEST,
  GET_SUBJECTS_SUCCESS,
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
} from "../types";
import { delayInSeconds } from "../utils";
import { showNotifications, hideNotification } from ".";
import { db } from "../firebase";
import { showNotification } from "./notificationActions";

const subjectsCollection = db.collection("subjects");

export const addSubject = (values) => async (dispatch, getState) => {
  dispatch(addSubjectRequest());
  try {
    const isSubjectExisting =
      getState().subjects.data.filter(
        (subject) => subject.subjectName === values.subjectName
      ).length !== 0;
    if (isSubjectExisting) {
      throw "Subject already exists!";
    } else {
      subjectsCollection
        .doc(values.subjectName)
        .set({ ...values, totalStudentsEnrolled: 0, totalTeachers: 0 });
      dispatch(addSubjectSuccess());
    }
  } catch (error) {
    dispatch(showNotification("ERROR", error));
  }
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

  subjectsCollection.onSnapshot(async (snapshot) => {
    const subjectsDocument = snapshot.docs.map(async (doc) => {
      const subjectName = doc.data().subjectName;

      const enrolledStudents = await subjectsCollection
        .doc(subjectName)
        .collection("enrolledStudents")
        .get()
        .then((documents) => documents.docs.map((doc) => doc.data()));
      const teachers = await subjectsCollection
        .doc(subjectName)
        .collection("teachers")
        .get()
        .then((documents) => documents.docs.map((doc) => doc.data()));
      return {
        subjectName,
        enrolledStudents,
        teachers,
      };
    });
    const documents = await Promise.all(subjectsDocument);
    dispatch(getSubjectsSuccess(documents));
  });
};

export const getSubjectsRequest = () => {
  return {
    type: GET_SUBJECTS_REQUEST,
  };
};

export const getSubjectsSuccess = (results) => {
  return {
    type: GET_SUBJECTS_SUCCESS,
    data: results,
  };
};
