import { takeEvery, put } from "redux-saga/effects";
import {
  GET_SUBJECT_FIELDS_REQUEST,
  GET_STUDENT_FIELDS_REQUEST,
  GET_TEACHERS_REQUEST,
  GET_TEACHER_FIELDS_REQUEST,
} from "../types";
import {
  getSubjectFieldsSuccess,
  setError,
  getTeacherFieldsSuccess,
  getStudentFieldsSuccess,
} from "../actions";
import axios from "../api";
function* getSubjectFields() {
  try {
    const response = yield axios.get("/fields/subjects").then((r) => r.data);
    yield put(getSubjectFieldsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* getTeacherFieldsSaga({ payload }) {
  try {
    const response = yield axios
      .get(`/fields/teachers/${payload}`)
      .then((r) => r.data);
    yield put(getTeacherFieldsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* getStudentFieldsSaga({ payload }) {
  try {
    const response = yield axios
      .get(`/fields/students/${payload}`)
      .then((r) => r.data);
    yield put(getStudentFieldsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

export function* watchField() {
  yield takeEvery(GET_SUBJECT_FIELDS_REQUEST, getSubjectFields);
  yield takeEvery(GET_STUDENT_FIELDS_REQUEST, getStudentFieldsSaga);
  yield takeEvery(GET_TEACHER_FIELDS_REQUEST, getTeacherFieldsSaga);
}
