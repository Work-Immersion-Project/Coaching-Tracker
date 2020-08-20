import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationPage from "./NotificationPage";
import {
  hideModal,
  showModal,
  updateNotificationRequest,
  clearNotificationsRequest,
} from "../../actions";
import { currentUserSelector } from "../../selectors";

const NotificationPageContainer = () => {
  const dispatch = useDispatch();
  const stateToProps = useSelector((state) => {
    return {
      notifications: state.notifications.data,
      currentUser: currentUserSelector(state),
    };
  });

  const dispatchToProps = {
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    updateNotification: useCallback(
      (notificationID) => dispatch(updateNotificationRequest(notificationID)),
      [dispatch]
    ),
    clearNotifications: useCallback(
      () => dispatch(clearNotificationsRequest()),
      [dispatch]
    ),
  };

  return <NotificationPage {...dispatchToProps} {...stateToProps} />;
};

export default NotificationPageContainer;
