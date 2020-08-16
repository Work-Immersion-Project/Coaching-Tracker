import { takeEvery, put } from "redux-saga/effects";
import { REGISTRATION_REGISTER_USER_REQUEST } from "../types";
import {
  showModal,
  setError,
  addStudentRequest,
  addTeacherRequest,
} from "../actions";

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
    const metadata = {
      fullname: `${firstName} ${middleName} ${lastName}`,
      firstName,
      middleName,
      lastName,
      createdAt,
      lastLoggedIn: null,
    };

    if (type === "teacher") {
      yield put(addTeacherRequest({ id, email, metadata }));
    } else if (type === "student") {
      yield put(addStudentRequest({ id, email, course, metadata }));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchRegistration() {
  yield takeEvery(REGISTRATION_REGISTER_USER_REQUEST, registerUserSaga);
}
