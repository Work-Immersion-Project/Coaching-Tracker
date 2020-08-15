import { take, takeEvery, put, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  GET_COACHING_SCHEDULES_REQUEST,
  ADD_COACHING_SCHEDULE_REQUEST,
  UPDATE_COACHING_SCHEDULE_STATUS_REQUEST,
} from "../types";
import {
  setError,
  getCoachingSchedulesSuccess,
  hideModal,
  showModal,
  addCoachingScheduleSuccess,
  showAlert,
  updateCoachingScheduleStatusSuccess,
} from "../actions";
import { collections, db } from "../firebase";
import { getCurrentUser, getGapiCalendarClient } from "../selectors";
import { v4 as uuidV4 } from "uuid";
import { convertCoachingScheduleDates } from "../utils";
import axios from "../api";
import firebase from "firebase";

//** GET COACHING SESSIONS */

function* getStudentCoachingSessions(coachingSessionsRef, studentInfo) {
  const channel = eventChannel((subs) =>
    coachingSessionsRef
      .where("studentAttendees", "array-contains", studentInfo)
      .onSnapshot((snap) => {
        const coachingSessionDocs = snap.docs;
        const coachingSessions = coachingSessionDocs.map((doc) => {
          const coachingSessionData = doc.data();
          return {
            ...coachingSessionData,
            students: coachingSessionData.studentAttendees.map(
              (student) => student.email
            ),
          };
        });
        console.log("called");
        subs(coachingSessions);
      })
  );

  try {
    while (true) {
      const sessions = yield take(channel);
      yield put(getCoachingSchedulesSuccess(sessions));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getTeacherCoachingSessions(coachingSessionsRef, teacherInfo) {
  const channel = eventChannel((subs) =>
    coachingSessionsRef
      .where("teacher", "==", teacherInfo)
      .onSnapshot((snap) => {
        const coachingSessionDocs = snap.docs;
        const coachingSessions = coachingSessionDocs.map((doc) => {
          const coachingSessionData = doc.data();
          return {
            ...coachingSessionData,
            students: coachingSessionData.studentAttendees.map(
              (student) => student.email
            ),
          };
        });
        subs(coachingSessions);
      })
  );

  try {
    while (true) {
      const coachingSessions = yield take(channel);
      yield put(getCoachingSchedulesSuccess(coachingSessions));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getCoachingSessionsSaga({ payload: { isStudent } }) {
  const currentUser = yield select(getCurrentUser);
  const coachingSessionsRef = collections.coachingSessions;
  if (isStudent) {
    yield getStudentCoachingSessions(coachingSessionsRef, {
      email: currentUser.email,
      fullName: currentUser.metadata.fullName,
    });
  } else {
    yield getTeacherCoachingSessions(coachingSessionsRef, {
      email: currentUser.email,
      fullName: currentUser.metadata.fullName,
    });
  }
}

// END OF GET COACHING SESSIONS

//** ADD COACHING SESSIONS */
function* addCoachingSessionSaga({
  payload: { startDate, startTime, endDate, endTime, title, studentAttendees },
}) {
  const coachingSessionID = uuidV4();
  const gapiCalendar = yield select(getGapiCalendarClient);
  const { email, metadata } = yield select(getCurrentUser);

  const {
    formattedStartingDate,
    formattedEndingDate,
  } = convertCoachingScheduleDates(startDate, endDate, startTime, endTime);

  const event = {
    summary: title,
    description: title,
    start: {
      dateTime: formattedStartingDate,
    },
    end: {
      dateTime: formattedEndingDate,
    },
    sendNotifications: true,
    attendees: studentAttendees,
    conferenceDataVersion: 1,
    reminders: {
      useDefault: "useDefault",
    },
    conferenceData: {
      createRequest: { requestId: coachingSessionID },
    },
  };

  yield put(hideModal());
  yield put(showModal("LOADING_MODAL"));

  try {
    const results = yield gapiCalendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then((e) => e.result);
    const gmLink = results.conferenceData.entryPoints[0].uri;
    const eventID = results.id;
    const coachingSessionRef = collections.coachingSessions.doc(
      coachingSessionID
    );
    const teacherRef = collections.teacher.doc(email);
    const coachingSessionData = {
      coachingSessionId: coachingSessionID,
      teacher: {
        email,
        fullName: metadata.fullName,
      },
      title: title,
      description: title,
      startDate: formattedStartingDate,
      endDate: formattedEndingDate,
      eventId: eventID,
      meetingLink: gmLink,
      studentAttendees: studentAttendees,
      createdAt: new Date(),
      status: "pending",
    };
    yield axios.post("coaching-sessions", coachingSessionData);
    yield put(hideModal());
    yield put(addCoachingScheduleSuccess(coachingSessionData));
    yield put(showAlert("SUCCESS", "Coaching Schedule Added!"));

    // const fieldVal = firebase.firestore.FieldValue;

    // yield db
    //   .runTransaction(async (trans) => {
    //     const teacherCoachingSessionRef = teacherRef
    //       .collection("coachingSessions")
    //       .doc(coachingSessionID);
    //     trans.update(teacherRef, {
    //       "coachingStats.pending": fieldVal.increment(1),
    //     });
    //     trans.set(coachingSessionRef, coachingSessionData);
    //     trans.set(teacherCoachingSessionRef, {
    //       coachingSessionId: coachingSessionID,
    //     });
    //     //Iterate for each student
    //     studentAttendees.forEach((student) => {
    //       const studentRef = collections.student.doc(student.email);
    //       const studentCoachingSessionCollectionRef = studentRef
    //         .collection("coachingSessions")
    //         .doc(coachingSessionID);
    //       trans.update(studentRef, {
    //         "coachingStats.pending": fieldVal.increment(1),
    //       });
    //       trans.set(studentCoachingSessionCollectionRef, {
    //         coachingSessionId: coachingSessionID,
    //       });
    //     });
    //     return studentAttendees;
    //   })
    //   .then((students) => {
    //     // TODO: Add Notification
    //     // let message = `Your teacher ${metadata.fullName} has scheduled a session.`;
    //     // students.forEach((student) => {
    //     //   dispatch(
    //     //     addNotification(
    //     //       { ...student, type: "student" },
    //     //       message,
    //     //       coachingSessionId,
    //     //       "pending"
    //     //     )
    //     //   );
    //     // });
    //   });
  } catch (error) {
    yield put(setError(error.message));
  }
}
// END OF ADD COACHING SESSIONS

//** UPDATE COACHING SESSIONS */

function* updateCoachingSessionSaga({
  payload: { coachingSessionID, status },
}) {
  const loggedInUser = yield select(getCurrentUser);
  const coachingSessionRef = collections.coachingSessions.doc(
    coachingSessionID
  );

  yield put(hideModal());
  try {
    yield db
      .runTransaction(async (trans) => {
        const coachingSessionData = await trans
          .get(coachingSessionRef)
          .then((doc) => doc.data());
        const sessionStatus =
          coachingSessionData.status === "waiting_for_response"
            ? "requests"
            : coachingSessionData.status;

        const teacherRef = collections.teacher.doc(
          coachingSessionData.teacher.email
        );

        const teacherData = await trans
          .get(teacherRef)
          .then((doc) => doc.data());

        const studentRefs = coachingSessionData.studentAttendees.map(
          (student) => collections.student.doc(student.email)
        );
        const studentDatas = await Promise.all(
          studentRefs.map((studentRef) => trans.get(studentRef))
        ).then((docs) => docs.map((doc) => doc.data()));

        studentDatas.forEach(({ coachingStats }, index) => {
          coachingStats[sessionStatus] -= 1;
          coachingStats[status] += 1;
          trans.update(studentRefs[index], {
            coachingStats,
          });
        });

        teacherData.coachingStats[sessionStatus] -= 1;
        teacherData.coachingStats[status] += 1;
        trans.update(teacherRef, {
          coachingStats: { ...teacherData.coachingStats },
        });

        trans.set(coachingSessionRef, {
          ...coachingSessionData,
          status,
        });
        return coachingSessionData.studentAttendees;
      })
      .then(async (students) => {
        //TODO: ADD TO NOTIFICATIONS
      });
    yield put(showAlert("SUCCESS", "Schedule Updated Successfully!"));
    yield put(updateCoachingScheduleStatusSuccess());
  } catch (error) {
    yield put(setError(error.message));
  }
}

// END OF UPDATE COACHING SESSIONS

export function* watchCoachingSession() {
  yield takeEvery(GET_COACHING_SCHEDULES_REQUEST, getCoachingSessionsSaga);
  yield takeEvery(ADD_COACHING_SCHEDULE_REQUEST, addCoachingSessionSaga);
  yield takeEvery(
    UPDATE_COACHING_SCHEDULE_STATUS_REQUEST,
    updateCoachingSessionSaga
  );
}
