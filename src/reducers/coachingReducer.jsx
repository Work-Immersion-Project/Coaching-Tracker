import {
  ADD_COACHING_ATTENDEE,
  REMOVE_COACHING_ATTENDEE,
  CLEAR_COACHING_ATTENDEES,
  ADD_COACHING_SCHEDULE_REQUEST,
  ADD_COACHING_SCHEDULE_SUCCESS,
  GET_COACHING_SCHEDULES_REQUEST,
  GET_COACHING_SCHEDULES_SUCCESS,
  GET_COACHING_SCHEDULE_REQUEST,
  GET_COACHING_SCHEDULE_SUCCESS,
  REMOVE_COACHING_SCHEDULE_REQUEST,
  REMOVE_COACHING_SCHEDULE_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  coachingSchedules: [],
  selectedStudentAttendees: [],
  selectedCoachingSchedule: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COACHING_ATTENDEE:
      return {
        ...state,
        selectedStudentAttendees: [
          ...state.selectedStudentAttendees,
          action.data,
        ],
      };
    case REMOVE_COACHING_ATTENDEE:
      return {
        ...state,
        selectedStudentAttendees: state.selectedStudentAttendees.filter(
          (student) => student.name !== action.data.name
        ),
      };
    case CLEAR_COACHING_ATTENDEES:
      return {
        ...state,
        selectedStudentAttendees: [],
      };
    case GET_COACHING_SCHEDULES_REQUEST:
      return {
        ...state,
      };
    case GET_COACHING_SCHEDULES_SUCCESS:
      return {
        ...state,
        coachingSchedules: action.data,
      };
    case ADD_COACHING_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case ADD_COACHING_SCHEDULE_SUCCESS: {
      return {
        ...state,
      };
    }
    case REMOVE_COACHING_SCHEDULE_REQUEST: {
      return { ...state };
    }
    case REMOVE_COACHING_SCHEDULE_SUCCESS: {
      return { ...state };
    }

    default:
      return state;
  }
};
