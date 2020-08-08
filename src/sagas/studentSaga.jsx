import { ADD_STUDENT_REQUEST, GET_STUDENTS_REQUEST } from "../types";
import { takeEvery, put, take, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { collections } from "../firebase";
import {
  hideModal,
  addStudentSuccess,
  showAlert,
  setError,
  getStudentsSuccess,
} from "../actions";
import { getCurrentUser } from "../selectors";
import _ from "lodash";

function* addStudentSaga({
  payload: { email, id, metadata, coachingStats, course },
}) {
  try {
    yield collections["student"].doc(email).set({
      metadata,
      email,
      id,
      enrolledSubjects: [],
      coachingStats,
      course,
    });
    yield put(hideModal());
    yield put(addStudentSuccess());
    yield put(
      showAlert("SUCCESS", `Student ${metadata.fullname} has been added!`)
    );
  } catch (error) {
    console.log(error);
    yield put(setError(error.message));
  }
}

function* getStudents() {
  const studentsRef = collections.student;
  const channel = eventChannel((subs) =>
    studentsRef.onSnapshot((snapshot) =>
      subs(snapshot.docs.map((doc) => doc.data()))
    )
  );

  try {
    while (true) {
      const students = yield take(channel);
      yield put(getStudentsSuccess(students));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getStudentsBySubject(subjectName) {
  try {
    const currUser = select(getCurrentUser);
    const studentDocuments = currUser.handledSubjects.map(
      async (subject) =>
        await collections.subject
          .doc(subject)
          .collection("enrolledStudents")
          .get()
          .then((snapshot) => snapshot.docs.map((document) => document.data()))
    );
    const students = yield Promise.all(studentDocuments);
    const filteredStudents = _.mapKeys(
      _.flatten(students),
      (value) => value.email
    );

    yield put(
      getStudentsSuccess(
        Object.keys(filteredStudents).map((value) => {
          return {
            email: value,
          };
        })
      )
    );
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getStudentsSaga({ payload }) {
  console.log("geting");
  if (payload.subjectName) {
    yield getStudentsBySubject(payload.subjectName);
  } else {
    yield getStudents();
  }
}

export function* watchStudent() {
  yield takeEvery(ADD_STUDENT_REQUEST, addStudentSaga);
  yield takeEvery(GET_STUDENTS_REQUEST, getStudentsSaga);
}
