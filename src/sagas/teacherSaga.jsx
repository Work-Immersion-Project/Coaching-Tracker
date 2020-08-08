import {
  addTeacherSuccess,
  showModal,
  setError,
  hideModal,
  showAlert,
} from "../actions";
import { takeEvery, put } from "redux-saga/effects";
import { ADD_TEACHER_REQUEST } from "../types";
import { collections } from "../firebase";
function* addTeacherSaga({
  payload: { email, firstName, middleName, lastName, id, createdAt },
}) {
  yield put(showModal("LOADING_MODAL"));
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
      cancelled: 0,
      overdue: 0,
      ongoing: 0,
      requests: 0,
      waiting_for_response: 0,
    };

    yield collections["teacher"].doc(email).set({
      metadata,
      email,
      id,
      handledSubjects: [],
      coachingStats,
    });

    yield put(hideModal());
    yield put(addTeacherSuccess());
    yield put(
      showAlert("SUCCESS", `Teacher ${metadata.fullName} has been added!`)
    );
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchTeacher() {
  yield takeEvery(ADD_TEACHER_REQUEST, addTeacherSaga);
}
