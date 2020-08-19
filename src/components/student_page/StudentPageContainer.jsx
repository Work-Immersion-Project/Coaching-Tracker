import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  getCoachingSchedulesRequest,
  getNotificationsRequest,
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
  };

  return <StudentPage {...dispatchToProps} />;
};

export default StudentPageContainer;
