import {
  addTeacherSuccess,
  showModal,
  setError,
  hideModal,
  showAlert,
  getTeachersSuccess,
  assignSubjectToTeacherSuccess,
  removeSubjectFromTeacherSuccess,
} from "../actions";
import { take, takeEvery, put, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  ADD_TEACHER_REQUEST,
  GET_TEACHERS_REQUEST,
  ASSIGN_SUBJECT_TO_TEACHER_REQUEST,
  REMOVE_SUBJECT_FROM_TEACHER_REQUEST,
} from "../types";
import { collections, db } from "../firebase";
import { getCurrentUser } from "../selectors";
import firebase from "firebase";
import _ from "lodash";
import axios from "../api";

function* getTeachers() {
  const ws = new WebSocket("ws://localhost:8000/teachers");
  const channel = eventChannel(
    (subs) =>
      (ws.onmessage = (e) => {
        subs(e.data);
      })
  );

  try {
    while (true) {
      const response = yield take(channel);
      const teachers = JSON.parse(response);
      yield put(getTeachersSuccess(teachers.data));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getTeachersBySubj() {
  const loggedInStudent = yield select(getCurrentUser);
  const teacherDocs = loggedInStudent.enrolledSubjects.map(
    async (subj) =>
      await collections.subjects
        .doc(subj)
        .collection("teachers")
        .get()
        .then((snap) => snap.docs.map((doc) => doc.data()))
  );

  const teachers = yield Promise.all(teacherDocs);
  const filteredTeachers = _.mapKeys(
    _.flatten(teachers),
    (value) => value.email
  );

  yield put(
    getTeachersSuccess(
      _.map(filteredTeachers, (value, _) => {
        return value;
      })
    )
  );
}

function* getTeachersSaga({ payload: { filterBySubj } }) {
  if (filterBySubj) {
    yield getTeachersBySubj();
  } else {
    yield getTeachers();
  }
}

function* addTeacherSaga({ payload: { email, metadata, id } }) {
  yield put(showModal("LOADING_MODAL"));
  try {
    yield axios.post("/register/teacher", { metadata, email, teacherID: id });

    yield put(hideModal());
    yield put(addTeacherSuccess());
    yield put(
      showAlert("SUCCESS", `Teacher ${metadata.fullName} has been added!`)
    );
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* assignSubjectToTeacher({ payload: { ID, subjects } }) {
  yield put(hideModal());
  yield put(showModal("LOADING_MODAL"));
  try {
    yield axios.post(
      "subjects/teacher",
      subjects.map((subj) => {
        return {
          subjectID: subj.ID,
          teacherID: ID,
        };
      })
    );
    yield put(assignSubjectToTeacherSuccess());
    yield put(hideModal());
    yield put(
      showAlert(
        "SUCCESS",
        `You have successfully assigned subject/s: ${subjects.map(
          (subj) => subj.subjectName
        )}`
      )
    );
  } catch (error) {
    yield put(setError(error.message));
  }
  // const teacherRef = collections.teacher.doc(email);
  // const fieldVal = firebase.firestore.FieldValue;
  // yield put(hideModal());
  // yield put(showModal("LOADING_MODAL"));
  // try {
  //   yield db.runTransaction(async (trans) => {
  //     trans.update(teacherRef, {
  //       handledSubjects: subjects.map(({ subjectName }) => subjectName),
  //     });
  //     subjects.forEach((subj) => {
  //       const subjRef = collections.subjects.doc(subj.subjectName);
  //       const teacherCollRef = subjRef.collection("teachers").doc(email);
  //       trans.update(subjRef, {
  //         totalTeachers: fieldVal.increment(1),
  //       });
  //       trans.set(teacherCollRef, {
  //         email,
  //         fullName: metadata.fullName,
  //       });
  //     });
  //   });
  // yield put(assignSubjectToTeacherSuccess());
  // yield put(hideModal());
  // yield put(
  //   showAlert(
  //     "SUCCESS",
  //     `You have successfully assigned subject/s: ${subjects.map(
  //       (subj) => subj.subjectName
  //     )}`
  //   )
  // );
  // } catch (error) {
  //   yield put(setError(error.message));
  // }
}

function* removeSubjectFromTeacher({
  payload: {
    teacherDetails: { email, metadata },
    subjectName,
  },
}) {
  const teacherRef = collections.teacher.doc(email);
  const subjectRef = collections.subjects.doc(subjectName);
  const fieldVal = firebase.firestore.FieldValue;
  yield put(hideModal());
  yield put(showModal("LOADING_MODAL"));

  try {
    yield teacherRef.update({
      handledSubjects: fieldVal.arrayRemove(subjectName),
    });

    yield db.runTransaction(async (trans) => {
      const subjTeacherRef = subjectRef.collection("teachers").doc(email);
      trans.delete(subjTeacherRef);
      trans.update(subjectRef, {
        totalTeachers: fieldVal.increment(-1),
      });
    });

    yield put(hideModal());
    yield put(removeSubjectFromTeacherSuccess());
    yield put(
      showAlert(
        "SUCCESS",
        `Subject ${subjectName} has been unassigned from ${metadata.fullName}`
      )
    );
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchTeacher() {
  yield takeEvery(ADD_TEACHER_REQUEST, addTeacherSaga);
  yield takeEvery(GET_TEACHERS_REQUEST, getTeachersSaga);
  yield takeEvery(ASSIGN_SUBJECT_TO_TEACHER_REQUEST, assignSubjectToTeacher);
  yield takeEvery(
    REMOVE_SUBJECT_FROM_TEACHER_REQUEST,
    removeSubjectFromTeacher
  );
}
