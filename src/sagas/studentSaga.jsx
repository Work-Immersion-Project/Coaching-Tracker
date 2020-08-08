import { ADD_STUDENT_REQUEST } from "../types";
import { takeEvery, put } from "redux-saga/effects";
import { collections } from "../firebase";
import { hideModal, addStudentSuccess, showAlert, setError } from "../actions";

function* addStudentSaga({
  payload: { id, firstName, middleName, lastName, email, createdAt, course },
}) {
  try {
    const metadata = {
      fullname: `${firstName} ${middleName} ${lastName}`,
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
export function* watchStudent() {
  yield takeEvery(ADD_STUDENT_REQUEST, addStudentSaga);
}
