import { takeEvery, put } from "redux-saga/effects";
import { GET_SUBJECT_FIELDS_REQUEST } from "../types";
import { getSubjectFieldsSuccess, setError } from "../actions";
import { collections } from "../firebase";
import axios from "../api";
function* getSubjectFields() {
  try {
    const response = yield axios.get("/subjects/fields").then((r) => r.data);

    // const subjects = yield collections.subjects
    //   .get()
    //   .then((snap) => snap.docs.map((doc) => doc.data()));
    yield put(getSubjectFieldsSuccess(response.data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchField() {
  yield takeEvery(GET_SUBJECT_FIELDS_REQUEST, getSubjectFields);
}
