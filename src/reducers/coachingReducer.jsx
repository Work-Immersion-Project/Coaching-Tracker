import {
  GET_COACHING_SCHEDULES_REQUEST,
  GET_COACHING_SCHEDULES_SUCCESS,
  GET_COACHING_SCHEDULE_REQUEST,
  GET_COACHING_SCHEDULE_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  coachingSchedules: [],
  selectedStudentAttendees: [],
  selectedCoachingSchedule: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COACHING_SCHEDULES_REQUEST:
      return {
        ...state,
      };
    case GET_COACHING_SCHEDULES_SUCCESS:
      return {
        ...state,
        coachingSchedules: action.data,
      };
    case GET_COACHING_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case GET_COACHING_SCHEDULE_SUCCESS:
      return {
        ...state,
        selectedCoachingSchedule: action.data,
      };

    default:
      return state;
  }
};
