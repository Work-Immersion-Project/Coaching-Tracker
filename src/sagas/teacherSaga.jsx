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
function* addTeacherSaga({ payload: { email, id, metadata, coachingStats } }) {
  yield put(showModal("LOADING_MODAL"));
  try {
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
