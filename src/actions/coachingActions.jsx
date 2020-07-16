import {
  ADD_COACHING_ATTENDEE,
  REMOVE_COACHING_ATTENDEE,
  CLEAR_COACHING_ATTENDEES,
  GET_COACHING_SCHEDULE_REQUEST,
  GET_COACHING_SCHEDULE_SUCCESS,
  GET_COACHING_SCHEDULES_REQUEST,
  GET_COACHING_SCHEDULES_SUCCESS,
  ADD_COACHING_SCHEDULE_REQUEST,
  ADD_COACHING_SCHEDULE_SUCCESS,
  REMOVE_COACHING_SCHEDULE_REQUEST,
  REMOVE_COACHING_SCHEDULE_SUCCESS,
  REQUEST_COACHING_SCHEDULE_REQUEST,
  REQUEST_COACHING_SCHEDULE_SUCCESS,
} from "../types";
import {
  add,
  formatRFC3339,
  formatISO,
  getHours,
  getMinutes,
  sub,
} from "date-fns";
import { showNotification, showModal, hideModal } from "../actions";
import { normalizeDate } from "../utils";
import firebase from "firebase";
import { db } from "../firebase";
import { result } from "lodash";
import { setError } from "./errorActions";

const coachingLogsCollection = db.collection("coachingLogs");
const teacherCollection = db.collection("teachers");
const studentCollection = db.collection("students");

export const addCoachingAttendee = (student) => {
  return {
    type: ADD_COACHING_ATTENDEE,
    data: student,
  };
};

export const removeCoachingAttendee = (student) => {
  return {
    type: REMOVE_COACHING_ATTENDEE,
    data: student,
  };
};

export const clearCoachingAttendees = () => {
  return {
    type: CLEAR_COACHING_ATTENDEES,
  };
};

export const getCoachingSchedules = () => async (dispatch, getState) => {
  const { email, type } = getState().auth.data.user;
  dispatch(getCoachingSchedulesRequest());
  if (type === "student") {
    await dispatch(getStudentCoachingSchedules(email));
  } else if (type === "teacher") {
    await dispatch(getTeacherCoachingSchedule(email));
  }
};

const getStudentCoachingSchedules = (studentEmail) => async (dispatch) => {
  const studentDocRef = studentCollection.doc(studentEmail);
  studentDocRef.collection("coachingSessions").onSnapshot(async (snapshot) => {
    const coachingSessionIds = snapshot.docs.map((doc) => doc.id);
    // Fetch all coachingSessions using the ID
    const coachingSessions = await Promise.all(
      coachingSessionIds.map((id) => coachingLogsCollection.doc(id).get())
    ).then((results) =>
      results.map((result) => {
        const data = result.data();
        return {
          ...data,
          students: data.studentAttendees.map((student) => student.email),
        };
      })
    );
    dispatch(getCoachingSchedulesSuccess(coachingSessions));
  });
};

const getTeacherCoachingSchedule = (teacherEmail) => async (dispatch) => {
  const teacherRef = teacherCollection.doc(teacherEmail);
  teacherRef.collection("coachingSessions").onSnapshot(async (snapshot) => {
    const coachingSessionIds = snapshot.docs.map((doc) => doc.id);
    // Fetch all coachingSessions using the ID
    const coachingSessions = await Promise.all(
      coachingSessionIds.map((id) => coachingLogsCollection.doc(id).get())
    ).then((results) =>
      results.map((result) => {
        const data = result.data();
        return {
          ...data,
          students: data.studentAttendees.map((student) => student.email),
        };
      })
    );
    dispatch(getCoachingSchedulesSuccess(coachingSessions));
  });
};

const getCoachingSchedulesRequest = () => {
  return {
    type: GET_COACHING_SCHEDULES_REQUEST,
  };
};

const getCoachingSchedulesSuccess = (result) => {
  return {
    type: GET_COACHING_SCHEDULES_SUCCESS,
    data: result,
  };
};

export const getCoachingSchedule = (eventId) => async (
  dispatch,
  getState
) => {};

export const getCoachingScheduleRequest = () => {
  return {
    type: GET_COACHING_SCHEDULE_REQUEST,
  };
};

export const getCoachingScheduleSuccess = (result) => {
  return {
    type: GET_COACHING_SCHEDULE_SUCCESS,
    data: result,
  };
};

export const addCoachingSchedule = (coachingDetails) => async (
  dispatch,
  getState
) => {
  const { gapiCalendar } = getState().gapi;
  const { email, metadata } = getState().auth.data.user;
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    title,
    studentAttendees,
  } = coachingDetails;
  const convertedStudentAttendees = studentAttendees.map((student) => {
    return {
      email: student.email,
      fullName: student.metadata.fullName,
    };
  });

  const randomRequestId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const convertedEndTime = {
    hours: getHours(endTime),
    minutes: getMinutes(endTime),
  };

  const convertedStartTime = {
    hours: getHours(startTime),
    minutes: getMinutes(startTime),
  };

  const convertedStartDate = normalizeDate(startDate);
  const convertedEndDate = normalizeDate(endDate);

  const adjustedStartingDate = formatRFC3339(
    add(convertedStartDate, convertedStartTime)
  );

  const adjustedEndingDate = formatRFC3339(
    add(convertedEndDate, convertedEndTime)
  );

  const event = {
    summary: title,
    description: title,
    start: {
      dateTime: adjustedStartingDate,
    },
    end: {
      dateTime: adjustedEndingDate,
    },
    sendNotifications: true,
    attendees: convertedStudentAttendees,
    conferenceDataVersion: 1,
    reminders: {
      useDefault: "useDefault",
    },
    conferenceData: {
      createRequest: { requestId: randomRequestId },
    },
  };

  dispatch(hideModal());
  dispatch(addCoachingScheduleRequest());
  dispatch(showModal("LOADING_MODAL"));
  try {
    const results = await gapiCalendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then((event) => {
        return event.result;
      });
    const googleMeetsLink = results.conferenceData.entryPoints[0].uri;
    const eventId = results.id;
    const coachingSessionRef = coachingLogsCollection.doc(eventId);
    const teacherRef = teacherCollection.doc(email);
    const coachingSessionLogData = {
      teacher: {
        email,
        fullName: metadata.fullName,
      },
      title: title,
      description: title,
      startDate: adjustedStartingDate,
      endDate: adjustedEndingDate,
      eventId: eventId,
      meetingLink: googleMeetsLink,
      studentAttendees: convertedStudentAttendees,
      createdAt: new Date(),
      status: "pending",
    };
    const fieldValue = firebase.firestore.FieldValue;
    await db.runTransaction(async (transaction) => {
      const teacherCoachingSessionRef = teacherRef
        .collection("coachingSessions")
        .doc(eventId);
      transaction.set(coachingSessionRef, coachingSessionLogData);
      transaction.update(teacherRef, {
        "coachingStats.pending": fieldValue.increment(1),
      });
      transaction.set(teacherCoachingSessionRef, {
        eventId,
      });
      //Iterate for each student
      studentAttendees.forEach((student) => {
        const studentRef = studentCollection.doc(student.email);
        const studentCoachingSessionCollectionRef = studentRef
          .collection("coachingSessions")
          .doc(eventId);
        transaction.update(studentRef, {
          "coachingStats.pending": fieldValue.increment(1),
        });
        transaction.set(studentCoachingSessionCollectionRef, { eventId });
      });
    });
    dispatch(hideModal());
    dispatch(addCoachingScheduleSuccess());
    dispatch(showNotification("SUCCESS", "Coaching Schedule Added!"));
  } catch (error) {}
};
export const addCoachingScheduleRequest = () => {
  return {
    type: ADD_COACHING_SCHEDULE_REQUEST,
  };
};

export const addCoachingScheduleSuccess = () => {
  return {
    type: ADD_COACHING_SCHEDULE_SUCCESS,
  };
};

export const removeCoachingSchedule = (coachingId) => async (
  dispatch,
  getState
) => {
  const { gapiCalendar } = getState().gapi;
  const fieldValue = firebase.firestore.FieldValue;
  const coachingSessionRef = coachingLogsCollection.doc(coachingId);
  dispatch(removeCoachingScheduleRequest());
  dispatch(showModal("LOADING_MODAL"));
  try {
    await gapiCalendar.events.delete({
      calendarId: "primary",
      eventId: coachingId,
    });
    await db.runTransaction(async (transaction) => {
      const coachingData = await transaction
        .get(coachingSessionRef)
        .then((coachingDoc) => coachingDoc.data());
      const { status, studentAttendees, teacher } = coachingData;
      const teacherRef = teacherCollection.doc(teacher);
      const teacherCoachingSessionRef = teacherRef
        .collection("coachingSessions")
        .doc(coachingId);
      const teacherData = await transaction
        .get(teacherRef)
        .then((teacherDoc) => teacherDoc.data());
      const teacherCoachingStats = teacherData.coachingStats;

      //Iterate students
      for (const student of studentAttendees) {
        const studentRef = studentCollection.doc(student.email);
        const studentCoachingSessionRef = studentRef
          .collection("coachingSessions")
          .doc(coachingId);
        const studentData = await transaction
          .get(studentRef)
          .then((studentDoc) => studentDoc.data());

        const studentCoachingStats = studentData.coachingStats;

        studentCoachingStats[status] -= 1;
        transaction.update(studentRef, {
          coachingStats: { ...studentCoachingStats },
        });
        transaction.delete(studentCoachingSessionRef);
      }
      //Begin editing Teacher Data
      teacherCoachingStats[status] -= 1;

      transaction.update(teacherRef, {
        coachingStats: { ...teacherCoachingStats },
      });
      transaction.delete(teacherCoachingSessionRef);
      transaction.delete(coachingSessionRef);
    });

    dispatch(hideModal());

    dispatch(showNotification("SUCCESS", "Coaching Schedule Removed!"));
    dispatch(removeCoachingScheduleSuccess());
  } catch (error) {
    dispatch({
      type: "REMOVE_COACHING_SCHEDULE_ERROR",
      error: error,
    });
  }
};

export const removeCoachingScheduleRequest = () => {
  return {
    type: REMOVE_COACHING_SCHEDULE_REQUEST,
  };
};

export const removeCoachingScheduleSuccess = () => {
  return { type: REMOVE_COACHING_SCHEDULE_SUCCESS };
};

export const requestCoachingSchedule = (coachingDetails) => async (
  dispatch,
  getState
) => {
  const { gapiCalendar } = getState().gapi;
  const { email, metadata } = getState().auth.data.user;
  dispatch(requestCoachingScheduleRequest());
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    title,
    teacherAttendee,
  } = coachingDetails;

  const randomRequestId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const convertedEndTime = {
    hours: getHours(endTime),
    minutes: getMinutes(endTime),
  };

  const convertedStartTime = {
    hours: getHours(startTime),
    minutes: getMinutes(startTime),
  };

  const convertedStartDate = normalizeDate(startDate);
  const convertedEndDate = normalizeDate(endDate);

  const adjustedStartingDate = formatRFC3339(
    add(convertedStartDate, convertedStartTime)
  );

  const adjustedEndingDate = formatRFC3339(
    add(convertedEndDate, convertedEndTime)
  );
  const event = {
    summary: title,
    description: title,
    start: {
      dateTime: adjustedStartingDate,
    },
    end: {
      dateTime: adjustedEndingDate,
    },
    sendNotifications: true,
    attendees: [teacherAttendee],
    conferenceDataVersion: 1,
    reminders: {
      useDefault: "useDefault",
    },
    conferenceData: {
      createRequest: { requestId: randomRequestId },
    },
  };
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  try {
    const results = await gapiCalendar.events
      .insert({
        calendarId: "primary",
        resource: event,
      })
      .then((event) => {
        return event.result;
      });
    const googleMeetsLink = results.conferenceData.entryPoints[0].uri;
    const eventId = results.id;
    const creatorEmail = results.creator.email;
    const coachingSessionRef = coachingLogsCollection.doc(eventId);
    const studentRef = studentCollection.doc(creatorEmail);
    const studentCoachingSessionRef = studentRef
      .collection("coachingSessions")
      .doc(eventId);
    const teacherRef = teacherCollection.doc(teacherAttendee.email);
    const teacherCoachingSessionRef = teacherRef
      .collection("coachingSessions")
      .doc(eventId);

    const coachingSessionLogData = {
      teacher: teacherAttendee,
      title: title,
      description: title,
      startDate: adjustedStartingDate,
      endDate: adjustedEndingDate,
      eventId: eventId,
      meetingLink: googleMeetsLink,
      createdAt: new Date(),
      studentAttendees: [
        {
          email,
          fullName: metadata.fullName,
        },
      ],
      status: "waiting_for_response",
    };

    const fieldValue = firebase.firestore.FieldValue;
    await db
      .runTransaction(async (transaction) => {
        transaction.set(coachingSessionRef, coachingSessionLogData);
        transaction.update(teacherRef, {
          "coachingStats.requests": fieldValue.increment(1),
        });

        transaction.set(teacherCoachingSessionRef, {
          eventId,
        });
        transaction.set(studentCoachingSessionRef, { eventId });
        transaction.update(studentRef, {
          "coachingStats.requests": fieldValue.increment(1),
        });
      })
      .catch((error) => {
        throw error;
      });
    dispatch(hideModal());
    dispatch(requestCoachingScheduleSuccess());
    dispatch(showNotification("SUCCESS", "Coaching Schedule Requested!"));
  } catch (error) {
    dispatch(setError(error));
  }
};

const requestCoachingScheduleRequest = () => {
  return { type: REQUEST_COACHING_SCHEDULE_REQUEST };
};
const requestCoachingScheduleSuccess = () => {
  return {
    type: REQUEST_COACHING_SCHEDULE_SUCCESS,
  };
};
