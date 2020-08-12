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
  console.log("UPDATE APOINTMENT!");
  return {
    type: UPDATE_APPOINTMENT,
    data: appointmentMeta,
  };
};
