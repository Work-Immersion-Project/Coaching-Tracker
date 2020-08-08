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

function* registerUserSaga({ payload }) {
  const { email, type } = payload;
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
    if (type === "teacher") {
      yield put(addTeacherRequest(payload));
    } else if (type === "student") {
      yield put(addStudentRequest(payload));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchRegistration() {
  yield takeEvery(REGISTRATION_REGISTER_USER_REQUEST, registerUserSaga);
}
