import { SHOW_ALERT, HIDE_ALERT } from "../types";

const INITIAL_STATE = {
  message: null,
  notificationType: null,
  isOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        type: action.notificationType,
      };
    case HIDE_ALERT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
