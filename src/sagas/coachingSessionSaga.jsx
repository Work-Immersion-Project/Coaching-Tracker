import { take, takeEvery, put, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  GET_COACHING_SCHEDULES_REQUEST,
  ADD_COACHING_SCHEDULE_REQUEST,
  UPDATE_COACHING_SCHEDULE_STATUS_REQUEST,
  REQUEST_COACHING_SCHEDULE_REQUEST,
  CONFIRM_COACHING_SCHEDULE_REQUEST,
} from "../types";
import {
  setError,
  getCoachingSchedulesSuccess,
  hideModal,
  showModal,
  addCoachingScheduleSuccess,
  showAlert,
  updateCoachingScheduleStatusSuccess,
  requestCoachingScheduleSuccess,
} from "../actions";
import { getCurrentUser, getGapiCalendarClient } from "../selectors";
import { v4 as uuidV4 } from "uuid";
import { convertCoachingScheduleDates } from "../utils";
import axios from "../api";
import { API_BASE_URL } from "../consts/api";

//** GET COACHING SESSIONS */

function* getStudentCoachingSessions(studentID) {
  const ws = new WebSocket(
    `ws://${API_BASE_URL}/coaching-sessions/student/${studentID}`
  );

  const channel = eventChannel((subs) => (ws.onmessage = (e) => subs(e.data)));

  try {
    while (true) {
      const response = yield take(channel);
      const coachingSessions = JSON.parse(response);
      yield put(getCoachingSchedulesSuccess(coachingSessions.data));
    }
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* getTeacherCoachingSessions(teacherID) {
  const ws = new WebSocket(
    `ws://${API_BASE_URL}/coaching-sessions/teacher/${teacherID}`
  );

  const channel = eventChannel((subs) => (ws.onmessage = (e) => subs(e.data)));

  try {
    while (true) {
      const response = yield take(channel);
      const coachingSessions = JSON.parse(response);
      yield put(
        getCoachingSchedulesSuccess(
          coachingSessions.data.map((s) => {
            const sched = s;
            return {
              ...sched,
              students: sched.studentAttendees.map((st) => st.email),
            };
          })
        )
      );
    }
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

function* getCoachingSessionsSaga({ payload: { isStudent } }) {
  const currentUser = yield select(getCurrentUser);
  if (isStudent) {
    yield getStudentCoachingSessions(currentUser.ID);
  } else {
    yield getTeacherCoachingSessions(currentUser.ID);
  }
}

// END OF GET COACHING SESSIONS

//** ADD COACHING SESSIONS */
function* addCoachingSessionSaga({
  payload: { startDate, startTime, endDate, endTime, title, studentAttendees },
}) {
  const coachingSessionID = uuidV4();
  const gapiCalendar = yield select(getGapiCalendarClient);
  const currentUser = yield select(getCurrentUser);

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

    const coachingSessionData = {
      coachingSessionId: coachingSessionID,
      teacher: currentUser,
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
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}
// END OF ADD COACHING SESSIONS

//** UPDATE COACHING SESSIONS */

function* updateCoachingSessionSaga({ payload: { id, status } }) {
  try {
    yield put(hideModal());
    yield axios.patch(`coaching-sessions/${id}`, {
      status,
    });
    yield put(showAlert("SUCCESS", "Schedule Updated Successfully!"));
    yield put(updateCoachingScheduleStatusSuccess());
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}

// END OF UPDATE COACHING SESSIONS

//** REQUEST COACHING SESSION */
function* requestCoachingSessionSaga({
  payload: { startDate, startTime, endDate, endTime, title, teacher },
}) {
  const coachingSessionID = uuidV4();
  const gapiCalendar = yield select(getGapiCalendarClient);
  const currentUser = yield select(getCurrentUser);

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
    attendees: [teacher],
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

    const coachingSessionData = {
      coachingSessionId: coachingSessionID,
      teacher: teacher,
      title: title,
      description: title,
      startDate: formattedStartingDate,
      endDate: formattedEndingDate,
      eventId: eventID,
      meetingLink: gmLink,
      studentAttendees: [currentUser],
      createdAt: new Date(),
      status: "waiting",
    };
    yield axios.post("coaching-sessions", coachingSessionData);
    yield put(hideModal());
    yield put(requestCoachingScheduleSuccess(coachingSessionData));
    yield put(showAlert("SUCCESS", "Coaching Schedule Added!"));
  } catch (error) {
    yield put(setError(error.message));
  }
}
// END OF REQUEST COACHING SESSION

//** CONFIRM COACHING SESSION */
function* confirmCoachingSessionSaga({ payload: id }) {
  const currentUser = yield select(getCurrentUser);
  try {
    yield axios.post(
      `coaching-sessions/student/${currentUser.ID}/confirm/${id}`
    );
  } catch (error) {
    if (error.response) {
      yield put(setError(error.response.data.error.message));
    } else {
      yield put(setError(error.message));
    }
  }
}
// END OF CONFIRM COACHING SESSION
export function* watchCoachingSession() {
  yield takeEvery(GET_COACHING_SCHEDULES_REQUEST, getCoachingSessionsSaga);
  yield takeEvery(ADD_COACHING_SCHEDULE_REQUEST, addCoachingSessionSaga);
  yield takeEvery(
    REQUEST_COACHING_SCHEDULE_REQUEST,
    requestCoachingSessionSaga
  );
  yield takeEvery(
    UPDATE_COACHING_SCHEDULE_STATUS_REQUEST,
    updateCoachingSessionSaga
  );
  yield takeEvery(
    CONFIRM_COACHING_SCHEDULE_REQUEST,
    confirmCoachingSessionSaga
  );
}
