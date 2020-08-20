import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoachingSchedulesRequest,
  getNotificationsRequest,
} from "../../actions";
import TeacherPage from "./TeacherPage";
import { unseenNotificationsSelector } from "../../selectors";

const TeacherPageContainer = () => {
  const dispatch = useDispatch();

  const stateToProps = useSelector((state) => {
    return {
      notifications: unseenNotificationsSelector(state),
      isUpdatedByUser: state.notifications.isUpdatedByUser,
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
  };

  return <TeacherPage {...dispatchToProps} {...stateToProps} />;
};

export default TeacherPageContainer;
