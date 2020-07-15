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
} from "../types";
import {
  add,
  formatRFC3339,
  differenceInHours,
  differenceInMinutes,
  getHours,
  getMinutes,
} from "date-fns";
import { showNotification } from "../actions";
import { db } from "../firebase";

const coachingLogsCollection = db.collection("coachingLogs");

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
  const currentUserEmail = getState().auth.data.user.email;
  dispatch(getCoachingSchedulesRequest());
  try {
    coachingLogsCollection
      .where("teacher", "==", currentUserEmail)
      .onSnapshot((snapshot) => {
        dispatch(
          getCoachingSchedulesSuccess(snapshot.docs.map((doc) => doc.data()))
        );
      });
  } catch (error) {}
};

export const getCoachingSchedulesRequest = () => {
  return {
    type: GET_COACHING_SCHEDULES_REQUEST,
  };
};

export const getCoachingSchedulesSuccess = (result) => {
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
  const { startDate, startTime, endDate, endTime, title } = coachingDetails;
  const studentAttendees = getState().coaching.selectedStudentAttendees.map(
    (student) => {
      return {
        email: student.email,
      };
    }
  );
  const randomRequestId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const startHourDiff = Math.abs(
    differenceInHours(new Date(startDate), new Date(startTime))
  );
  const startMinuteDiff = Math.abs(
    differenceInMinutes(new Date(startDate), new Date(startTime))
  );

  const convertedEndTime = {
    hours: getHours(endTime),
    minutes: getMinutes(endTime),
  };

  const convertedStartTime = {
    hours: getHours(startTime),
    minutes: getMinutes(startTime),
  };

  const adjustedStartingDate = formatRFC3339(
    add(new Date(startDate), convertedStartTime)
  );

  const adjustedEndingDate = formatRFC3339(
    add(new Date(endDate), convertedEndTime)
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
    attendees: studentAttendees,
    conferenceDataVersion: 1,
    reminders: {
      useDefault: "useDefault",
    },
    conferenceData: {
      createRequest: { requestId: randomRequestId },
    },
  };

  dispatch(addCoachingScheduleRequest());

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

    await coachingLogsCollection.doc(eventId).set({
      teacher: creatorEmail,
      title: title,
      description: title,
      startDate: adjustedStartingDate,
      endDate: adjustedEndingDate,
      eventId: eventId,
      meetingLink: googleMeetsLink,
      studentAttendees: studentAttendees.map((student) => student.email),
      status: "pending",
    });

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
  dispatch(removeCoachingScheduleRequest());

  try {
    await gapiCalendar.events.delete({
      calendarId: "primary",
      eventId: coachingId,
    });
    await coachingLogsCollection.doc(coachingId).delete();
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
