import { GAPI_INIT_REQUEST, GAPI_INIT_SUCCESS } from "../types";

const INITIAL_STATE = {
  gapiAuth: null,
  gapiCalendar: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAPI_INIT_REQUEST:
      return { ...state };
    case GAPI_INIT_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};
