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
  CONFIRM_COACHING_SCHEDULE_REQUEST,
  CONFIRM_COACHING_SCHEDULE_SUCCESS,
  ACCEPT_COACHING_SCHEDULE_REQUEST,
  ACCEPT_COACHING_SCHEDULE_SUCCESS,
} from "../types";

export const confirmCoachingScheduleRequest = (coachingSessionID) => {
  return {
    type: CONFIRM_COACHING_SCHEDULE_REQUEST,
    payload: coachingSessionID,
  };
};

export const confirmCoachingScheduleSuccess = () => {
  return {
    type: CONFIRM_COACHING_SCHEDULE_SUCCESS,
  };
};

export const updateCoachingScheduleStatusRequest = (sessionDetails) => {
  return {
    type: UPDATE_COACHING_SCHEDULE_STATUS_REQUEST,
    payload: sessionDetails,
  };
};

export const updateCoachingScheduleStatusSuccess = () => {
  return { type: UPDATE_COACHING_SCHEDULE_STATUS_SUCCESS };
};

export const getCoachingSchedulesRequest = (isStudent) => {
  return {
    type: GET_COACHING_SCHEDULES_REQUEST,
    payload: { isStudent },
  };
};

export const getCoachingSchedulesSuccess = (result) => {
  return {
    type: GET_COACHING_SCHEDULES_SUCCESS,
    payload: result,
  };
};

export const getCoachingScheduleRequest = (coachingSessionID) => {
  return {
    type: GET_COACHING_SCHEDULE_REQUEST,
    payload: coachingSessionID,
  };
};

export const getCoachingScheduleSuccess = (coachingSession) => {
  return {
    type: GET_COACHING_SCHEDULE_SUCCESS,
    payload: coachingSession,
  };
};

export const addCoachingScheduleRequest = (coachingDetails) => {
  return {
    type: ADD_COACHING_SCHEDULE_REQUEST,
    payload: coachingDetails,
  };
};

export const addCoachingScheduleSuccess = (newCoachingSession) => {
  return {
    type: ADD_COACHING_SCHEDULE_SUCCESS,
    payload: newCoachingSession,
  };
};

export const requestCoachingScheduleRequest = (coachingSessionDetails) => {
  return {
    type: REQUEST_COACHING_SCHEDULE_REQUEST,
    payload: coachingSessionDetails,
  };
};
export const requestCoachingScheduleSuccess = () => {
  return {
    type: REQUEST_COACHING_SCHEDULE_SUCCESS,
  };
};

export const acceptCoachingScheduleRequest = (sessionDetails) => {
  return {
    type: ACCEPT_COACHING_SCHEDULE_REQUEST,
    payload: sessionDetails,
  };
};

export const acceptCoachingScheduleSuccess = () => {
  return {
    type: ACCEPT_COACHING_SCHEDULE_SUCCESS,
  };
};
