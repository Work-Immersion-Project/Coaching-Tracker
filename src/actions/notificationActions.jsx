import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
} from "../types";

// export const getNotifications = () => async (dispatch, getState) => {
//   const currentLoggedInUser = getState().auth.data.user;
//   if (currentLoggedInUser.type !== "admin") {
//     dispatch(getNotificationsRequest());
//     collections[currentLoggedInUser.type]
//       .doc(currentLoggedInUser.email)
//       .collection("notifications")
//       .onSnapshot((snapshot) => {
//         const userNotifications = snapshot.docs.map((doc) => {
//           return {
//             ...doc.data(),
//             notificationId: doc.id,
//           };
//         });
//         const unseenNotificationCount = userNotifications.filter(
//           (notif) => !notif.seen
//         ).length;
//         dispatch(
//           getNotificationsSuccess(
//             _.orderBy(userNotifications, "createdAt", "desc")
//           )
//         );
//         if (unseenNotificationCount > 0) {
//           dispatch(
//             showAlert(
//               "NOTIFY",
//               `You have ${unseenNotificationCount} new notifications.`
//             )
//           );
//         }
//       });
//   }
// };

export const getNotificationsRequest = () => {
  return { type: GET_NOTIFICATIONS_REQUEST };
};
export const getNotificationsSuccess = (results) => {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: results,
  };
};

// export const updateNotification = (notificationId) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch(updateNotificationRequest());
//     const { email, type } = getState().auth.data.user;
//     await collections[type]
//       .doc(email)
//       .collection("notifications")
//       .doc(notificationId)
//       .update({ seen: true });
//     dispatch(updateNotificationSuccess());
//   } catch (error) {
//     dispatch(setError(error));
//   }
// };

export const updateNotificationRequest = (notificationID) => {
  return {
    type: UPDATE_NOTIFICATION_REQUEST,
    payload: notificationID,
  };
};

export const updateNotificationSuccess = () => {
  return {
    type: UPDATE_NOTIFICATION_SUCCESS,
  };
};
