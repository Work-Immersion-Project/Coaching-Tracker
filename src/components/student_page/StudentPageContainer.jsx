import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  getCoachingSchedulesRequest,
  getNotificationsRequest,
  checkDesktopNotificationPermissionRequest,
} from "../../actions";
import StudentPage from "./StudentPage";

const StudentPageContainer = () => {
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

  return <StudentPage {...dispatchToProps} />;
};

export default StudentPageContainer;
