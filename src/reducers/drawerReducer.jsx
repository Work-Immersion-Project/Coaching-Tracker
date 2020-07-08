import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_EVENT_DRAWER,
  CLOSE_EVENT_DRAWER,
} from "../types";

const INITIAL_STATE = {
  navigationDrawer: {
    isOpen: false,
  },
  addEventDrawer: {
    isOpen: false,
    selectedDate: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        navigationDrawer: {
          isOpen: true,
        },
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        navigationDrawer: {
          isOpen: false,
        },
      };
    case OPEN_EVENT_DRAWER:
      return {
        ...state,
        addEventDrawer: {
          isOpen: true,
          selectedData: action.payload,
        },
      };
    case CLOSE_EVENT_DRAWER:
      return {
        ...state,
        addEventDrawer: {
          isOpen: false,
          selectedData: null,
        },
      };
    default:
      return state;
  }
};
