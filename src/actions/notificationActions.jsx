import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_REQUEST,
  ADD_NOTIFICATION_REQUEST,
  ADD_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
} from "../types";
import { setError, showAlert } from "./";
import { v4 as uuidV4 } from "uuid";
import { db } from "../firebase";

const collections = {
  student: db.collection("students"),
  teacher: db.collection("teachers"),
};

export const getNotifications = () => async (dispatch, getState) => {
  const currentLoggedInUser = getState().auth.data.user;
  if (!currentLoggedInUser.type !== "admin") {
    dispatch(getNotificationsRequest());
    collections[currentLoggedInUser.type]
      .doc(currentLoggedInUser.email)
      .collection("notifications")
      .onSnapshot((snapshot) => {
        const userNotifications = snapshot.docs.map((doc) => doc.data());
        const unseenNotificationCount = userNotifications.filter(
          (notif) => !notif.seen
        ).length;
        dispatch(getNotificationsSuccess(userNotifications));
        if (unseenNotificationCount > 0) {
          dispatch(
            showAlert(
              "NOTIFY",
              `You have ${unseenNotificationCount} new notifications.`
            )
          );
        }
      });
  }
};

const getNotificationsRequest = () => {
  return { type: GET_NOTIFICATIONS_REQUEST };
};
const getNotificationsSuccess = (results) => {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    data: results,
  };
};

export const addNotification = (
  recepient,
  message,
  coachingSessionId,
  type
) => async (dispatch, getState) => {
  try {
    dispatch(addNotificationRequest());
    const notificationId = uuidV4();
    const sender = getState().auth.data.user;
    console.log(recepient);
    await collections[recepient.type]
      .doc(recepient.email)
      .collection("notifications")
      .doc(notificationId)
      .set({
        message,
        coachingSessionId,
        sender: {
          email: sender.email,
          fullName: sender.metadata.fullName,
        },
        seen: false,
        type,
      });
    dispatch(addNotificationSuccess());
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

const addNotificationRequest = () => {
  return { type: ADD_NOTIFICATION_REQUEST };
};

const addNotificationSuccess = () => {
  return { type: ADD_NOTIFICATION_SUCCESS };
};

export const updateNotification = (notificationId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(updateNotificationRequest());
    const { email, type } = getState().auth.data.user;
    await collections[type]
      .doc(email)
      .collection("notifications")
      .doc(notificationId)
      .update({ seen: true });
    dispatch(updateNotificationSuccess());
  } catch (error) {
    dispatch(setError(error));
  }
};

const updateNotificationRequest = () => {
  return {
    type: UPDATE_NOTIFICATION_REQUEST,
  };
};

const updateNotificationSuccess = () => {
  return {
    type: UPDATE_NOTIFICATION_SUCCESS,
  };
};
