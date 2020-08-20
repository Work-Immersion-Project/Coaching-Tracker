import {
  HIDE_APPOINTMENT_TOOLTIP,
  SHOW_APPOINTMENT_TOOLTIP,
  UPDATE_APPOINTMENT_META,
} from "../types";

const INITIAL_STATE = {
  appointmentTooltip: {
    target: null,
    data: {},
    isVisible: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_APPOINTMENT_TOOLTIP: {
      return {
        ...state,
        appointmentTooltip: { ...state.appointmentTooltip, isVisible: true },
      };
    }
    case HIDE_APPOINTMENT_TOOLTIP: {
      return {
        ...state,
        appointmentTooltip: { ...state.appointmentTooltip, isVisible: false },
      };
    }
    case UPDATE_APPOINTMENT_META: {
      return {
        ...state,
        appointmentTooltip: {
          ...state.appointmentTooltip,
          target: action.payload.target,
          data: action.payload.data,
        },
      };
    }
    default: {
      return state;
    }
  }
};
