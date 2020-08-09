import { takeEvery, put } from "redux-saga/effects";
import { GET_SUBJECT_FIELDS_REQUEST } from "../types";
import { getSubjectFieldsSuccess, setError } from "../actions";
import { collections } from "../firebase";

function* getSubjectFields() {
  try {
    const subjects = yield collections.subjects
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data()));
    yield put(getSubjectFieldsSuccess(subjects));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchField() {
  yield takeEvery(GET_SUBJECT_FIELDS_REQUEST, getSubjectFields);
}
