import { takeEvery, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { addSubjectSuccess, setError, getSubjectsSuccess } from "../actions";
import { GET_SUBJECTS_REQUEST, ADD_SUBJECT_REQUEST } from "../types";
import { collections } from "../firebase";
import { getSubjectsFromState } from "../selectors";
import axios from "../api";

function* addSubject({ payload: { subjectName } }) {
  try {
    // Check if Subject is Existing
    const subjects = yield select(getSubjectsFromState);
    const isSubjectFound =
      subjects.filter((subj) => subj.subjectName === subjectName).length !== 0;
    if (isSubjectFound) {
      throw new Error("Subject Already Exists");
    }

    axios.post("/subjects", {
      subjectName,
    });

    yield put(addSubjectSuccess());
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getSubjects() {
  const ws = new WebSocket("ws://localhost:8000/subjects");
  const event = eventChannel((sub) => (ws.onmessage = (m) => sub(m.data)));

  try {
    while (true) {
      const response = yield take(event);
      const subjects = JSON.parse(response);
      yield put(getSubjectsSuccess(subjects.data));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchSubjects() {
  yield takeEvery(GET_SUBJECTS_REQUEST, getSubjects);
  yield takeEvery(ADD_SUBJECT_REQUEST, addSubject);
}
