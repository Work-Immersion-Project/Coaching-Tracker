import {
  SHOW_APPOINTMENT_TOOLTIP,
  HIDE_APPOINTMENT_TOOLTIP,
  UPDATE_APPOINTMENT_META,
} from "../types";

export const toggleTooltipVisibility = (isVisible) => {
  if (isVisible) {
    return {
      type: SHOW_APPOINTMENT_TOOLTIP,
    };
  }
  return {
    type: HIDE_APPOINTMENT_TOOLTIP,
  };
};

export const updateAppointmentMeta = (appointmentMeta) => {
  return {
    type: UPDATE_APPOINTMENT_META,
    payload: appointmentMeta,
  };
};
