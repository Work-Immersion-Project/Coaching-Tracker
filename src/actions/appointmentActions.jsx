import {
  UPDATE_APPOINTMENT,
  SHOW_APPOINTMENT,
  HIDE_APPOINTMENT,
} from "../types";

export const showAppointmentTooltip = () => {
  return {
    type: SHOW_APPOINTMENT,
  };
};
export const hideAppointmentTooltip = () => {
  return {
    type: HIDE_APPOINTMENT,
  };
};
export const updateAppointmentTooltip = (appointmentMeta) => {
  return {
    type: UPDATE_APPOINTMENT,
    data: appointmentMeta,
  };
};
