import { takeEvery, put } from "redux-saga/effects";
import { REGISTRATION_REGISTER_USER_REQUEST } from "../types";
import {
  registerUserSuccess,
  showModal,
  setError,
  addStudentRequest,
  addTeacherRequest,
} from "../actions";
import { collections } from "../firebase";

function* registerUserSaga({
  payload: {
    id,
    firstName,
    middleName,
    lastName,
    email,
    createdAt,
    course = "",
    type,
  },
}) {
  yield put(showModal("LOADING_MODAL"));
  try {
    // Check if the document is existing
    const userDoc = yield collections["user"].doc(email).get();
    if (userDoc.exists) {
      throw new Error("User Already Exists");
    }

    yield collections["user"].doc(email).set({
      type,
    });

    yield put(registerUserSuccess());

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

    if (type === "teacher") {
      yield put(addTeacherRequest(id, email, metadata, coachingStats));
    } else if (type === "student") {
      yield put(
        addStudentRequest({ id, email, course, metadata, coachingStats })
      );
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchRegistration() {
  yield takeEvery(REGISTRATION_REGISTER_USER_REQUEST, registerUserSaga);
}
