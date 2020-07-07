import {
  GET_CALENDARS_EVENT_ERROR,
  GET_CALENDARS_EVENT_REQUEST,
  GET_CALENDARS_EVENT_SUCCESS,
  GET_CALENDAR_EVENT_ERROR,
  GET_CALENDAR_EVENT_REQUEST,
  GET_CALENDAR_EVENT_SUCCESS,
  ADD_CALENDAR_EVENT_ERROR,
  ADD_CALENDAR_EVENT_REQUEST,
  ADD_CALENDAR_EVENT_SUCCESS,
} from "../types";
const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CALENDARS_EVENT_REQUEST:
      return { ...state };
    case GET_CALENDARS_EVENT_SUCCESS:
      return { ...state, data: action.data, error: null };
    case GET_CALENDARS_EVENT_ERROR:
      return { ...state, data: null, error: null };
    default:
      return state;
  }
};
