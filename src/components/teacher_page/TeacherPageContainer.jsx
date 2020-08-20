import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  getCoachingSchedulesRequest,
  getNotificationsRequest,
  checkDesktopNotificationPermissionRequest,
} from "../../actions";
import TeacherPage from "./TeacherPage";

const TeacherPageContainer = () => {
  const dispatch = useDispatch();

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

  return <TeacherPage {...dispatchToProps} />;
};

export default TeacherPageContainer;
