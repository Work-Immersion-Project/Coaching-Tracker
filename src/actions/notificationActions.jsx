import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  CHECK_DESKTOP_NOTIFICATION_PERMISSION_REQUEST,
  CHECK_DESKTOP_NOTIFICATION_PERMISSION_SUCCESS,
  CLEAR_NOTIFICATIONS_REQUEST,
  CLEAR_NOTIFICATIONS_SUCCESS,
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

export const checkDesktopNotificationPermissionRequest = () => {
  return {
    type: CHECK_DESKTOP_NOTIFICATION_PERMISSION_REQUEST,
  };
};

export const checkDesktopNotificationPermissionSuccess = (
  isDesktopNotificationAllowed
) => {
  return {
    type: CHECK_DESKTOP_NOTIFICATION_PERMISSION_SUCCESS,
    payload: isDesktopNotificationAllowed,
  };
};

export const clearNotificationsRequest = () => {
  return {
    type: CLEAR_NOTIFICATIONS_REQUEST,
  };
};

export const clearNotificationsSuccess = () => {
  return {
    type: CLEAR_NOTIFICATIONS_SUCCESS,
  };
};
