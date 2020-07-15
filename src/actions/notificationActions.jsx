import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../types";

export const showNotification = (type, message) => {
  return {
    type: SHOW_NOTIFICATION,
    notificationType: type,
    message: message,
  };
};

export const hideNotification = () => {
  return {
    type: HIDE_NOTIFICATION,
  };
};
