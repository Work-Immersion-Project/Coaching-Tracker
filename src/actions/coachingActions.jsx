import {
  GET_COACHING_SCHEDULE_REQUEST,
  GET_COACHING_SCHEDULE_SUCCESS,
  GET_COACHING_SCHEDULES_REQUEST,
  GET_COACHING_SCHEDULES_SUCCESS,
  ADD_COACHING_SCHEDULE_REQUEST,
  ADD_COACHING_SCHEDULE_SUCCESS,
  REQUEST_COACHING_SCHEDULE_REQUEST,
  REQUEST_COACHING_SCHEDULE_SUCCESS,
  UPDATE_COACHING_SCHEDULE_STATUS_REQUEST,
  UPDATE_COACHING_SCHEDULE_STATUS_SUCCESS,
} from "../types";

import { showAlert, showModal, hideModal, addNotification } from "../actions";
import { convertCoachingScheduleDates } from "../utils";
import firebase from "firebase";
import {
  db,
  coachingSessionCollection,
  teacherCollection,
  studentCollection,
} from "../firebase";
import { v4 as uuidV4 } from "uuid";
import { setError } from "./errorActions";

export const confirmCoachingSchedule = (coachingSessionId) => async (
  dispatch,
  getState
) => {
  dispatch(hideModal());
  const { type, metadata, email } = getState().auth.data.user;
  const coachingSessionRef = coachingSessionCollection.doc(coachingSessionId);
  await db
    .runTransaction(async (transaction) => {
      // Fetch all data first

      // Start Fetching the Coaching Session Data
      const coachingSessionData = await transaction
        .get(coachingSessionRef)
        .then((doc) => doc.data());
      const studentsConfirmed = coachingSessionData.studentsConfirmed
        ? coachingSessionData.studentsConfirmed
        : [];
      const sessionStatus = coachingSessionData.status;
      const teacherRef = teacherCollection.doc(
        coachingSessionData.teacher.email
      );
      const teacherDoc = await transaction.get(teacherRef);
      const teacherData = teacherDoc.data();
      const studentRefs = coachingSessionData.studentAttendees.map((student) =>
        studentCollection.doc(student.email)
      );
      const studentDatas = await Promise.all(
        studentRefs.map((studentRef) => transaction.get(studentRef))
      ).then((docs) => docs.map((doc) => doc.data()));

      if (type === "teacher") {
        transaction.update(coachingSessionRef, { studentsConfirmed });
      } else if (type === "student") {
        if (
          studentsConfirmed.filter((student) => student.email === email)
            .length === 0
        ) {
          studentsConfirmed.push({
            email,
            fullName: metadata.fullName,
          });
        }
        if (
          studentsConfirmed.length ===
          coachingSessionData.studentAttendees.length
        ) {
          studentDatas.forEach(({ coachingStats }, index) => {
            coachingStats[sessionStatus] -= 1;
            coachingStats["finished"] += 1;
            transaction.update(studentRefs[index], { coachingStats });
          });

          // Update Teacher Coaching Sessions
          teacherData.coachingStats[sessionStatus] -= 1;
          teacherData.coachingStats["finished"] += 1;
          transaction.update(teacherRef, {
            coachingStats: { ...teacherData.coachingStats },
          });
          transaction.set(coachingSessionRef, {
            ...coachingSessionData,
            status: "finished",
            studentsConfirmed,
          });
        } else {
          transaction.update(coachingSessionRef, { studentsConfirmed });
        }
      }
      return coachingSessionData.studentAttendees;
    })
    .then((students) => {
      if (type === "teacher") {
        let message = `Your teacher ${metadata.fullName} has request you to confirm the completion of the session.`;
        students.forEach((student) => {
          dispatch(
            addNotification(
              { ...student, type: "student" },
              message,
              coachingSessionId,
              "ongoing"
            )
          );
        });
      }
    })
    .catch((error) => {
      dispatch(setError(error.message));
    });
};

export const updateCoachingScheduleStatus = (
  coachingSessionId,
  status
) => async (dispatch, getState) => {
  const currentLoggedinUser = getState().auth.data.user;
  const coachingSessionRef = coachingSessionCollection.doc(coachingSessionId);

  dispatch(hideModal());
  dispatch(updateCoachingScheduleStatusRequest());
  await db
    .runTransaction(async (transaction) => {
      const coachingSessionData = await transaction
        .get(coachingSessionRef)
        .then((doc) => doc.data());

      const sessionStatus =
        coachingSessionData.status === "waiting_for_response"
          ? "requests"
          : coachingSessionData.status;

      const teacherRef = teacherCollection.doc(
        coachingSessionData.teacher.email
      );

      const teacherData = await transaction
        .get(teacherRef)
        .then((doc) => doc.data());

      const studentRefs = coachingSessionData.studentAttendees.map((student) =>
        studentCollection.doc(student.email)
      );
      const studentDatas = await Promise.all(
        studentRefs.map((studentRef) => transaction.get(studentRef))
      ).then((docs) => docs.map((doc) => doc.data()));

      studentDatas.forEach(({ coachingStats }, index) => {
        coachingStats[sessionStatus] -= 1;
        coachingStats[status] += 1;
        transaction.update(studentRefs[index], {
          coachingStats,
        });
      });

      teacherData.coachingStats[sessionStatus] -= 1;
      teacherData.coachingStats[status] += 1;
      transaction.update(teacherRef, {
        coachingStats: { ...teacherData.coachingStats },
      });

      transaction.set(coachingSessionRef, {
        ...coachingSessionData,
        status,
      });
      return coachingSessionData.studentAttendees;
    })
    .then(async (students) => {
      let message = "";
      switch (status) {
        case "cancelled":
          message = `Your teacher ${currentLoggedinUser.metadata.fullName} has cancelled the coaching session.`;
          break;
        case "denied":
          message = `Your teacher ${currentLoggedinUser.metadata.fullName} has cancelled the coaching session.`;
          break;
        case "pending":
          message = `Your teacher ${currentLoggedinUser.metadata.fullName} has accepted your coaching request.`;
          break;
        case "ongoing":
          message = `Your teacher ${currentLoggedinUser.metadata.fullName} has started the coaching session`;
          break;
        default:
          break;
      }
      if (message !== "") {
        for (const student of students) {
          await dispatch(
            addNotification(
              { ...student, type: "student" },
              message,
              coachingSessionId,
              status
            )
          );
        }
      }
    })
    .catch((error) => {
      dispatch(setError(error.message));
    });

  dispatch(showAlert("SUCCESS", "Schedule Updated Successfully!"));
  dispatch(updateCoachingScheduleStatusSuccess());
};

export const updateCoachingScheduleStatusRequest = () => {
  return { type: UPDATE_COACHING_SCHEDULE_STATUS_REQUEST };
};

export const updateCoachingScheduleStatusSuccess = () => {
  return { type: UPDATE_COACHING_SCHEDULE_STATUS_SUCCESS };
};

export const getCoachingSchedules = () => async (dispatch, getState) => {
  const { email, type } = getState().auth.data.user;
  dispatch(getCoachingSchedulesRequest());
  if (type === "student") {
    dispatch(getStudentCoachingSchedules(email));
  } else if (type === "teacher") {
    dispatch(getTeacherCoachingSchedule(email));
  }
};

const getStudentCoachingSchedules = (studentEmail) => async (dispatch) => {
  const studentRef = studentCollection.doc(studentEmail);

  studentRef.onSnapshot(async () => {
    const coachingSessionIds = await studentRef
      .collection("coachingSessions")
      .get()
      .then((snap) => snap.docs.map((doc) => doc.id));

    const coachingSessions = await Promise.all(
      coachingSessionIds.map((id) => coachingSessionCollection.doc(id).get())
    );
    const filteredSessions = coachingSessions
      .filter((document) => document.exists)
      .map((session) => {
        const sessionData = session.data();
        return {
          ...sessionData,
          students: sessionData.studentAttendees.map(
            (student) => student.email
          ),
        };
      });

    dispatch(getCoachingSchedulesSuccess(filteredSessions));
  });
};

const getTeacherCoachingSchedule = (teacherEmail) => async (dispatch) => {
  const teacherRef = teacherCollection.doc(teacherEmail);

  teacherRef.onSnapshot(async () => {
    const coachingSessionIds = await teacherRef
      .collection("coachingSessions")
      .get()
      .then((snap) => snap.docs.map((doc) => doc.id));

    const coachingSessions = await Promise.all(
      coachingSessionIds.map((id) => coachingSessionCollection.doc(id).get())
    );
    const filteredSessions = coachingSessions
      .filter((document) => document.exists)
      .map((session) => {
        const sessionData = session.data();
        return {
          ...sessionData,
          students: sessionData.studentAttendees.map(
            (student) => student.email
          ),
        };
      });
    dispatch(getCoachingSchedulesSuccess(filteredSessions));
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

export const getCoachingSchedule = (coachingSessionId) => async (
  dispatch,
  getState
) => {
  const currentSchedules = getState().coaching.coachingSchedules;
  dispatch(getCoachingScheduleRequest());
  // Check if it is existing
  let coachingSchedule = currentSchedules.filter(
    (sched) => sched.coachingSessionId === coachingSessionId
  )[0];

  if (!coachingSchedule) {
    coachingSchedule = await coachingSessionCollection
      .doc(coachingSessionId)
      .get()
      .then((doc) => doc.data());
  }
  dispatch(getCoachingScheduleSuccess(coachingSchedule));
};

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
  const coachingSessionId = uuidV4();
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
    attendees: convertedStudentAttendees,
    conferenceDataVersion: 1,
    reminders: {
      useDefault: "useDefault",
    },
    conferenceData: {
      createRequest: { requestId: coachingSessionId },
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
    const coachingSessionRef = coachingSessionCollection.doc(coachingSessionId);
    const teacherRef = teacherCollection.doc(email);
    const coachingSessionData = {
      coachingSessionId,
      teacher: {
        email,
        fullName: metadata.fullName,
      },
      title: title,
      description: title,
      startDate: formattedStartingDate,
      endDate: formattedEndingDate,
      eventId: eventId,
      meetingLink: googleMeetsLink,
      studentAttendees: convertedStudentAttendees,
      createdAt: new Date(),
      status: "pending",
    };
    const fieldValue = firebase.firestore.FieldValue;

    await db
      .runTransaction(async (transaction) => {
        const teacherCoachingSessionRef = teacherRef
          .collection("coachingSessions")
          .doc(coachingSessionId);
        transaction.update(teacherRef, {
          "coachingStats.pending": fieldValue.increment(1),
        });
        transaction.set(coachingSessionRef, coachingSessionData);
        transaction.set(teacherCoachingSessionRef, { coachingSessionId });
        //Iterate for each student
        studentAttendees.forEach((student) => {
          const studentRef = studentCollection.doc(student.email);
          const studentCoachingSessionCollectionRef = studentRef
            .collection("coachingSessions")
            .doc(coachingSessionId);
          transaction.update(studentRef, {
            "coachingStats.pending": fieldValue.increment(1),
          });
          transaction.set(studentCoachingSessionCollectionRef, {
            coachingSessionId,
          });
        });
        return studentAttendees;
      })
      .then((students) => {
        let message = `Your teacher ${metadata.fullName} has scheduled a session.`;
        students.forEach((student) => {
          dispatch(
            addNotification(
              { ...student, type: "student" },
              message,
              coachingSessionId,
              "pending"
            )
          );
        });
      });
    dispatch(hideModal());
    dispatch(addCoachingScheduleSuccess());
    dispatch(showAlert("SUCCESS", "Coaching Schedule Added!"));
  } catch (error) {
    dispatch(setError(error.message));
  }
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

export const requestCoachingSchedule = (coachingDetails) => async (
  dispatch,
  getState
) => {
  const { gapiCalendar } = getState().gapi;
  const { email, metadata } = getState().auth.data.user;
  const coachingSessionId = uuidV4();
  dispatch(requestCoachingScheduleRequest());
  const {
    startDate,
    startTime,
    endDate,
    endTime,
    title,
    teacherAttendee,
  } = coachingDetails;

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
    attendees: [teacherAttendee],
    conferenceDataVersion: 1,
    reminders: {
      useDefault: "useDefault",
    },
    conferenceData: {
      createRequest: { requestId: coachingSessionId },
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
    const coachingSessionRef = coachingSessionCollection.doc(coachingSessionId);
    const studentRef = studentCollection.doc(creatorEmail);
    const studentCoachingSessionRef = studentRef
      .collection("coachingSessions")
      .doc(coachingSessionId);
    const teacherRef = teacherCollection.doc(teacherAttendee.email);
    const teacherCoachingSessionRef = teacherRef
      .collection("coachingSessions")
      .doc(coachingSessionId);

    const coachingSessionData = {
      coachingSessionId,
      teacher: teacherAttendee,
      title: title,
      description: title,
      startDate: formattedStartingDate,
      endDate: formattedEndingDate,
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
        transaction.set(coachingSessionRef, coachingSessionData);
        transaction.update(teacherRef, {
          "coachingStats.requests": fieldValue.increment(1),
        });

        transaction.set(teacherCoachingSessionRef, { coachingSessionId });
        transaction.set(studentCoachingSessionRef, { coachingSessionId });
        transaction.update(studentRef, {
          "coachingStats.requests": fieldValue.increment(1),
        });
      })
      .catch((error) => {
        throw error;
      });
    dispatch(
      addNotification(
        { ...teacherAttendee, type: "teacher" },
        `Your student ${metadata.fullName} has requested a coaching session.`,
        coachingSessionId,
        "waiting_for_response"
      )
    );
    dispatch(hideModal());
    dispatch(requestCoachingScheduleSuccess());
    dispatch(showAlert("SUCCESS", "Coaching Schedule Requested!"));
  } catch (error) {
    dispatch(setError(error.message));
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
