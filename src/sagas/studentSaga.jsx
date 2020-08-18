import {
  ADD_STUDENT_REQUEST,
  GET_STUDENTS_REQUEST,
  ASSIGN_STUDENT_SUBJECT_REQUEST,
  REMOVE_STUDENT_SUBJECT_REQUEST,
} from "../types";
import { takeEvery, put, take, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { collections, db } from "../firebase";
import {
  hideModal,
  addStudentSuccess,
  showAlert,
  setError,
  getStudentsSuccess,
  showModal,
  removeStudentSubjectSuccess,
} from "../actions";
import { getCurrentUser } from "../selectors";
import firebase from "firebase";
import axios from "../api";
import { config } from "../consts/config";

function* addStudentSaga({ payload: { email, metadata, course, id } }) {
  try {
    yield axios.post("/register/student", {
      metadata,
      email,
      course,
      studentID: id,
    });
    yield put(hideModal());
    yield put(addStudentSuccess());
    yield put(
      showAlert("SUCCESS", `Student ${metadata.fullName} has been added!`)
    );
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* getStudents() {
  const ws = new WebSocket(`${config.WS_BASE_URL}/students`);

  const channel = eventChannel((sub) => {
    return (ws.onmessage = (m) => {
      sub(m.data);
    });
  });
  try {
    while (true) {
      const response = yield take(channel);
      const students = JSON.parse(response);
      yield put(getStudentsSuccess(students.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* getStudentsBySubject() {
  try {
    const currUser = yield select(getCurrentUser);
    const response = yield axios
      .get(`/students/subject`, {
        params: {
          ids: currUser.handledSubjects.map((subj) => subj.ID).join(),
        },
      })
      .then((r) => r.data);
    yield put(getStudentsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(getStudentsSuccess([]));
      yield put(setError(error.message));
    }
  }
}

function* getStudentsSaga({ payload: { filterBySubject } }) {
  if (filterBySubject) {
    yield getStudentsBySubject();
  } else {
    yield getStudents();
  }
}

function* assignStudentSubjSaga({ payload: { ID, subjects } }) {
  try {
    yield put(hideModal());
    yield put(showModal("LOADING_MODAL"));
    yield axios.post(
      "/subjects/student",
      subjects.map((subj) => {
        return {
          subjectID: subj.ID,
          studentID: ID,
        };
      })
    );

    yield put(hideModal());
    yield put(
      showAlert(
        "SUCCESS",
        `Student has been enrolled to Subjects: ${subjects.map(
          (subj) => subj.subjectName
        )}`
      )
    );
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* removeStudentSubjSaga({
  payload: {
    studentDetails: { email, metadata },
    subjectName,
  },
}) {
  const fieldValue = firebase.firestore.FieldValue;
  const studentRef = collections.student.doc(email);
  const subjRef = collections.subjects.doc(subjectName);
  yield put(hideModal());
  yield put(showModal("LOADING_MODAL"));

  yield studentRef.update({
    enrolledSubjects: fieldValue.arrayRemove(subjectName),
  });

  yield db.runTransaction(async (transaction) => {
    const enrolledStudentRef = subjRef
      .collection("enrolledStudents")
      .doc(email);
    transaction.delete(enrolledStudentRef);
    transaction.update(subjRef, {
      totalStudentsEnrolled: fieldValue.increment(-1),
    });
  });

  yield put(hideModal());
  yield put(removeStudentSubjectSuccess());
  yield put(
    showAlert(
      "SUCCESS",
      `Subject ${subjectName} has been removed from ${metadata.fullName}`
    )
  );
}

export function* watchStudent() {
  yield takeEvery(ADD_STUDENT_REQUEST, addStudentSaga);
  yield takeEvery(GET_STUDENTS_REQUEST, getStudentsSaga);
  yield takeEvery(ASSIGN_STUDENT_SUBJECT_REQUEST, assignStudentSubjSaga);
  yield takeEvery(REMOVE_STUDENT_SUBJECT_REQUEST, removeStudentSubjSaga);
}
