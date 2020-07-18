import {
  UPDATE_APPOINTMENT,
  SHOW_APPOINTMENT,
  HIDE_APPOINTMENT,
} from "../types";

const INITIAL_STATE = {
  visible: false,
  appointmentMeta: {
    target: null,
    data: {},
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HIDE_APPOINTMENT:
      return {
        ...state,
        visible: false,
      };
    case SHOW_APPOINTMENT:
      return {
        ...state,
        visible: true,
      };
    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointmentMeta: action.data,
      };
    default:
      return state;
  }
};
