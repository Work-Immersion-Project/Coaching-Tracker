import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
} from "../types";

export const getNotificationsRequest = () => {
  return { type: GET_NOTIFICATIONS_REQUEST };
};
export const getNotificationsSuccess = (results) => {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: results,
  };
};

export const updateNotificationRequest = (notificationID) => {
  return {
    type: UPDATE_NOTIFICATION_REQUEST,
    payload: notificationID,
  };
};

export const updateNotificationSuccess = (notificationID) => {
  return {
    type: UPDATE_NOTIFICATION_SUCCESS,
    payload: notificationID,
  };
};
