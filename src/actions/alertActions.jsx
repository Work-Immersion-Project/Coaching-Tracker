import { SHOW_ALERT, HIDE_ALERT } from "../types";

export const showAlert = (type, message) => {
  return {
    type: SHOW_ALERT,
    notificationType: type,
    message: message,
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};
