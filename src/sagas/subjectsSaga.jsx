import { takeEvery, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { addSubjectSuccess, setError, getSubjectsSuccess } from "../actions";
import { GET_SUBJECTS_REQUEST, ADD_SUBJECT_REQUEST } from "../types";
import { collections } from "../firebase";
import { getSubjectsFromState } from "../selectors";

function* addSubject({ payload: { subjectName } }) {
  try {
    // Check if Subject is Existing
    const subjects = yield select(getSubjectsFromState);
    const isSubjectFound =
      subjects.filter((subj) => subj.subjectName === subjectName).length !== 0;
    if (isSubjectFound) {
      throw new Error("Subject Already Exists");
    }

    collections.subjects.doc(subjectName).set({
      subjectName,
      totalStudentsEnrolled: 0,
      totalTeachers: 0,
    });
    yield put(addSubjectSuccess());
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getSubjects() {
  const subjRef = collections.subjects;
  const channel = eventChannel((subs) => {
    return subjRef.onSnapshot(async (snapshot) => {
      const subjDocs = snapshot.docs.map(async (doc) => {
        const subjectName = doc.data().subjectName;
        const enrolledStudents = await subjRef
          .doc(subjectName)
          .collection("enrolledStudents")
          .get()
          .then((snap) => snap.docs.map((doc) => doc.data()));
        const teachers = await subjRef
          .doc(subjectName)
          .collection("teachers")
          .get()
          .then((snap) => snap.docs.map((doc) => doc.data()));
        return {
          subjectName,
          enrolledStudents,
          teachers,
        };
      });
      const docs = await Promise.all(subjDocs);
      subs(docs);
    });
  });

  try {
    while (true) {
      const results = yield take(channel);
      yield put(getSubjectsSuccess(results));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchSubjects() {
  yield takeEvery(GET_SUBJECTS_REQUEST, getSubjects);
  yield takeEvery(ADD_SUBJECT_REQUEST, addSubject);
}
