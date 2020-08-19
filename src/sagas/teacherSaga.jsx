import {
  addTeacherSuccess,
  showModal,
  setError,
  hideModal,
  showAlert,
  getTeachersSuccess,
  assignSubjectToTeacherSuccess,
  removeSubjectFromTeacherSuccess,
  createWebsocket,
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
import { currentUserSelector } from "../selectors";
import firebase from "firebase";
import axios from "../api";
import { config } from "../consts/config";

function* getTeachers() {
  const ws = new WebSocket(`${config.WS_BASE_URL}/teachers`);

  const channel = eventChannel(
    (subs) =>
      (ws.onmessage = (e) => {
        subs(e.data);
      })
  );
  yield put(createWebsocket(ws));
  try {
    while (true) {
      const response = yield take(channel);
      const teachers = JSON.parse(response);
      yield put(getTeachersSuccess(teachers.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* getTeachersBySubj() {
  try {
    const loggedInStudent = yield select(currentUserSelector);
    const response = yield axios
      .get("teachers/subject", {
        params: {
          ids: loggedInStudent.enrolledSubjects.map((s) => s.ID).join(),
        },
      })
      .then((r) => r.data);
    yield put(getTeachersSuccess(response.data));
  } catch (error) {
    if (error.response) {
      yield put(getTeachersSuccess([]));
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
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
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
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
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
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
