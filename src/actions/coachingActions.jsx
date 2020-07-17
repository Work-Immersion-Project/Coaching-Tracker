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
import { isDayBehind , convertCoachingScheduleDates} from "../utils";
import firebase from "firebase";
import { db } from "../firebase";
import { v4 as uuidV4 } from "uuid";
import { setError } from "./errorActions";

const coachingLogsCollection = db.collection("coachingLogs");
const teacherCollection = db.collection("teachers");
const studentCollection = db.collection("students");


export const confirmCoachingSchedule = (oldCoachingSessionId) => async (dispatch,getState) => {
  dispatch(hideModal());
  const {type, metadata, email} = getState().auth.data.user;
  const oldCoachingSessionRef = coachingLogsCollection.doc(oldCoachingSessionId);
  const newCoachingSessionId = uuidV4();
  const updatedCoachingSessionRef = coachingLogsCollection.doc(newCoachingSessionId);

  await db.runTransaction(async (transaction ) => {
    // Fetch all data first
    const oldCoachingDoc = await transaction
    .get(oldCoachingSessionRef);
    const oldCoachingData = oldCoachingDoc.data();
    let studentsConfirmed =  [];
    const sessionStatus = oldCoachingData.status;
    const teacherRef = teacherCollection.doc(oldCoachingData.teacher.email);
    const teacherCoachingSessionRef = teacherRef
      .collection("coachingSessions")
      .doc(oldCoachingSessionId);
    
    const teacherDoc = await transaction
      .get(teacherRef);
    const teacherData = teacherDoc.data();
    const studentRefs = oldCoachingData.studentAttendees.map((student) => {
      const studentRef = studentCollection.doc(student.email);
      console.log(student);
      return {
        studentSessionCollectionRef : studentRef.collection('coachingSessions').doc(oldCoachingSessionId),
        studentRef,
      }
    });
    const studentDatas = await Promise.all(studentRefs.map( ({studentRef}) => transaction.get(studentRef)));
    const studentSessionDatas = await Promise.all(studentRefs.map(({studentSessionCollectionRef}) => transaction.get(studentSessionCollectionRef)));
    console.log(studentDatas.length);
    for (let i = 0; i < studentDatas.length; i++){
 
    const {studentRef, studentSessionCollectionRef} = studentRefs[i];

    const studentSessionData = studentSessionDatas[i].data();
    studentsConfirmed = studentSessionData.studentsConfirmed ? studentSessionData.studentsConfirmed : [];
    const {coachingStats} = studentDatas[i].data();
    if(type === "student"){
      if(studentsConfirmed.filter((student) => student.email === email).length === 0){
        studentsConfirmed.push({email, fullName: metadata.fullName})
      }
      if(studentsConfirmed.length === oldCoachingData.studentAttendees.length){
    
        // Update Student Coaching Sessions
        coachingStats[sessionStatus] -= 1;
        coachingStats['finished'] += 1;
        transaction.update(studentRef, { coachingStats });
        transaction.update(studentSessionCollectionRef, {   status: 'finished', studentsConfirmed });
        // Update Teacher Coaching Sessions
        teacherData.coachingStats[sessionStatus] -= 1;
        teacherData.coachingStats['finished'] += 1;
        transaction.update(teacherRef, {
          coachingStats: { ...teacherData.coachingStats },
        });
        transaction.update(teacherCoachingSessionRef, {
          ...oldCoachingData,
          status: 'finished',
          studentsConfirmed
        });
        transaction.set(updatedCoachingSessionRef, {
          ...oldCoachingData,
          status: 'finished',
          studentsConfirmed
        });
   
      }else {
        transaction.update(studentSessionCollectionRef, { studentsConfirmed });
      }
    } else {
      transaction.update(studentSessionCollectionRef, { studentsConfirmed });
    }
  }
  transaction.update(teacherCoachingSessionRef, {
    studentsConfirmed
  });
  transaction.update(oldCoachingSessionRef, {studentsConfirmed})
  return  oldCoachingData.studentAttendees;

  }).then((students) => {
    if(type === "teacher"){
      let message = `Your teacher ${metadata.fullName} has request you to confirm the completion of the session.`;
      students.forEach((student) => {
        dispatch(
          addNotification(
            { ...student, type: "student" },
            message,
            oldCoachingSessionId,
            "ongoing"
          )
        );
      });
    }
  }).catch((error)=> {
    console.log(error);
  })

}

export const updateCoachingScheduleStatus = (
  oldCoachingSessionId,
  status
) => async (dispatch, getState) => {
  const currentLoggedinUser = getState().auth.data.user;
  const newCoachingSessionId = uuidV4();
  const oldCoachingSessionRef = coachingLogsCollection.doc(
    oldCoachingSessionId
  );
  const updatedCoachingSessionRef = coachingLogsCollection.doc(
    newCoachingSessionId
  );
  dispatch(hideModal());
  dispatch(updateCoachingScheduleStatusRequest());

  await db
    .runTransaction(async (transaction) => {
      const oldCoachingDoc = await transaction
        .get(oldCoachingSessionRef);
      const oldCoachingData = oldCoachingDoc.data();
      
      const sessionStatus =
        oldCoachingData.status === "waiting_for_response"
          ? "requests"
          : oldCoachingData.status;
      const teacherRef = teacherCollection.doc(oldCoachingData.teacher.email);
      const teacherCoachingSessionRef = teacherRef
        .collection("coachingSessions")
        .doc(oldCoachingSessionId);
      const teacherDoc = await transaction
        .get(teacherRef)
        
        const teacherData = teacherDoc.data();
      const studentRefs = oldCoachingData.studentAttendees.map((student) => {
        const studentRef = studentCollection.doc(student.email);
        return {
          studentSessionCollectionRef : studentRef.collection('coachingSessions').doc(oldCoachingSessionId),
          studentRef,
        }
      });
      const studentDatas = await Promise.all(studentRefs.map( ({studentRef}) => transaction.get(studentRef)));

        
      for (let i = 0; i< studentDatas.length; i++){
        const {coachingStats} = studentDatas[i].data();
        coachingStats[sessionStatus] -= 1;
        coachingStats[status] += 1;
        transaction.update(studentRefs[i].studentRef, { coachingStats });
        transaction.update(studentRefs[i].studentSessionCollectionRef, { status });
      }
      teacherData.coachingStats[sessionStatus] -= 1;
      teacherData.coachingStats[status] += 1;

      transaction.update(teacherRef, {
        coachingStats: { ...teacherData.coachingStats },
      });
      transaction.update(teacherCoachingSessionRef, {
        ...oldCoachingData,
        status,
      });

      transaction.set(updatedCoachingSessionRef, {
        ...oldCoachingData,
        status,
      });
    
      return oldCoachingData.studentAttendees;
    })
    .then(async (students) => {
      let message = "";
      switch(status){
        case 'cancelled':
        message = `Your teacher ${currentLoggedinUser.metadata.fullName} has cancelled the coaching session.`;
        break;
        case 'denied':
        message = `Your teacher ${currentLoggedinUser.metadata.fullName} has cancelled the coaching session.`;
        break;
        case 'pending':
        message = `Your teacher ${currentLoggedinUser.metadata.fullName} has accepted your coaching request.`;
        break;
        case 'ongoing':
          message = `Your teacher ${currentLoggedinUser.metadata.fullName} has started the coaching session`;
          break;
      }

     if(message !== ''){
      for  (const student of students) {
        await dispatch(
           addNotification(
             { ...student, type: "student" },
             message,
             oldCoachingSessionId,
             status
           )
         );
       }
     }
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
    await dispatch(getStudentCoachingSchedules(email));
  } else if (type === "teacher") {
    await dispatch(getTeacherCoachingSchedule(email));
  }
};

const getStudentCoachingSchedules = (studentEmail) => async (dispatch) => {
  const studentDocRef = studentCollection.doc(studentEmail);
  studentDocRef.collection("coachingSessions").onSnapshot(async (snapshot) => {
    const coachingSessions = snapshot.docs
      .map((doc) => doc.data())
      .map((session) => {
        return {
          ...session,
          students: session.studentAttendees.map((student) => student.email),
        };
      });
    dispatch(getCoachingSchedulesSuccess(coachingSessions));
  });
};

const getTeacherCoachingSchedule = (teacherEmail) => async (dispatch) => {
  const teacherRef = teacherCollection.doc(teacherEmail);
  teacherRef.collection("coachingSessions").onSnapshot(async (snapshot) => {
    const coachingSessions = snapshot.docs
      .map((doc) => doc.data())
      .map((session) => {
        return {
          ...session,
          students: session.studentAttendees.map((student) => student.email),
        };
      });

    dispatch(getCoachingSchedulesSuccess(coachingSessions));
  });
};

const updateOverdueCoachingSchedules = () => async (dispatch) => {
  const coachingDocs = await coachingLogsCollection
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
  for (const coachingData of coachingDocs) {
    if (isDayBehind(new Date(coachingData.endDate))) {
      await dispatch(
        updateCoachingScheduleStatus(coachingData.eventId, "overdue")
      );
    }
  }
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
  const { email, type,metadata:{fullName} } = getState().auth.data.user;
  const currentSchedules = getState().coaching.coachingSchedules;
  // Check if it is existing
  let coachingSchedule = currentSchedules.filter(
    (schedule) => schedule.coachingSessionId === coachingSessionId
  );

  if (!coachingSchedule.length !== 0) {
    dispatch(getCoachingScheduleRequest());
    if (type === "teacher") {
      coachingSchedule = await teacherCollection
        .doc(email)
        .collection("coachingSessions")
        .doc(coachingSessionId)
        .get()
        .then((doc) => doc.data());
    } else if (type === "student") {
      coachingSchedule = await studentCollection
        .doc(email)
        .collection("coachingSessions")
        .doc(coachingSessionId)
        .get()
        .then((doc) => doc.data());
    }
    dispatch(getCoachingScheduleSuccess(coachingSchedule));
  }
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


  const {formattedStartingDate, formattedEndingDate} = 
  convertCoachingScheduleDates(startDate,endDate,startTime,endTime);
  

  const event = {
    summary: title,
    description: title,
    start: {
      dateTime: formattedStartingDate
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
    const coachingSessionRef = coachingLogsCollection.doc(coachingSessionId);
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

    await db.runTransaction(async (transaction) => {
      const teacherCoachingSessionRef = teacherRef
        .collection("coachingSessions")
        .doc(coachingSessionId);
      transaction.update(teacherRef, {
        "coachingStats.pending": fieldValue.increment(1),
      });
      transaction.set(coachingSessionRef, coachingSessionData);
      transaction.set(teacherCoachingSessionRef, coachingSessionData);
      //Iterate for each student
      studentAttendees.forEach((student) => {
        const studentRef = studentCollection.doc(student.email);
        const studentCoachingSessionCollectionRef = studentRef
          .collection("coachingSessions")
          .doc(coachingSessionId);
        transaction.update(studentRef, {
          "coachingStats.pending": fieldValue.increment(1),
        });
        transaction.set(
          studentCoachingSessionCollectionRef,
          coachingSessionData
        );
      });
      return studentAttendees;
    }).then((students) => {
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

  const {formattedStartingDate, formattedEndingDate} = 
  convertCoachingScheduleDates(startDate,endDate,startTime,endTime);

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
    const coachingSessionRef = coachingLogsCollection.doc(coachingSessionId);
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

        transaction.set(teacherCoachingSessionRef, coachingSessionData);
        transaction.set(studentCoachingSessionRef, coachingSessionData);
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
