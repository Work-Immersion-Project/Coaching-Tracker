import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_EVENT_DRAWER,
  CLOSE_EVENT_DRAWER,
} from "../types";

const INITIAL_STATE = {
  isDrawerOpen: false,
  isAddEventDrawerOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, isDrawerOpen: true };
    case CLOSE_DRAWER:
      return { ...state, isDrawerOpen: false };
    case OPEN_EVENT_DRAWER:
      return { ...state, isAddEventDrawerOpen: true };
    case CLOSE_EVENT_DRAWER:
      return { ...state, isAddEventDrawerOpen: false };
    default:
      return state;
  }
};
