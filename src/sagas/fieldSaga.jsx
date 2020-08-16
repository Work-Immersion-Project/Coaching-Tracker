import { takeEvery, put } from "redux-saga/effects";
import { GET_SUBJECT_FIELDS_REQUEST } from "../types";
import { getSubjectFieldsSuccess, setError } from "../actions";
import axios from "../api";
function* getSubjectFields() {
  try {
    const response = yield axios.get("/subjects/fields").then((r) => r.data);
    yield put(getSubjectFieldsSuccess(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchField() {
  yield takeEvery(GET_SUBJECT_FIELDS_REQUEST, getSubjectFields);
}
