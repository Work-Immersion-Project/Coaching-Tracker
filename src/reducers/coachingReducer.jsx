import {
  GET_COACHING_SCHEDULES_REQUEST,
  GET_COACHING_SCHEDULES_SUCCESS,
  GET_COACHING_SCHEDULE_REQUEST,
  GET_COACHING_SCHEDULE_SUCCESS,
  ADD_COACHING_SCHEDULE_REQUEST,
  ADD_COACHING_SCHEDULE_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  coachingSchedules: {},
  isLoading: null,
  selectedCoachingSchedule: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COACHING_SCHEDULE_REQUEST:
      return { ...state };
    case ADD_COACHING_SCHEDULE_SUCCESS:
      return {
        ...state,
      };
    case GET_COACHING_SCHEDULES_REQUEST:
      return {
        isLoading: true,
        ...state,
      };
    case GET_COACHING_SCHEDULES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        coachingSchedules: { ...state.coachingSchedules, ...action.payload },
      };
    case GET_COACHING_SCHEDULE_REQUEST:
      return {
        ...state,
      };
    case GET_COACHING_SCHEDULE_SUCCESS:
      return {
        ...state,
        selectedCoachingSchedule: action.payload,
      };

    default:
      return state;
  }
};
