import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoachingSchedulesRequest,
  getNotificationsRequest,
  checkDesktopNotificationPermissionRequest,
} from "../../actions";
import TeacherPage from "./TeacherPage";
import { unseenNotificationsSelector } from "../../selectors";

const TeacherPageContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      notifications: unseenNotificationsSelector(state),
      isUpdatedByUser: state.notifications.isUpdatedByUser,
      isDesktopNotificationAllowed:
        state.notifications.isDesktopNotificationAllowed,
    };
  });

  const dispatchToProps = {
    getCoachingSchedules: useCallback(
      (isStudent) => dispatch(getCoachingSchedulesRequest(isStudent)),
      [dispatch]
    ),
    getNotifications: useCallback(() => dispatch(getNotificationsRequest()), [
      dispatch,
    ]),
    checkDesktopNotificationPermission: useCallback(
      () => dispatch(checkDesktopNotificationPermissionRequest()),
      [dispatch]
    ),
  };

  return <TeacherPage {...dispatchToProps} {...stateToProps} />;
};

export default TeacherPageContainer;
