import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onGoingSessionsSelector,
  allCoachingSessionsSelector,
} from "../../../selectors";
import StudentDashboard from "./StudentDashboard";
import { showModal, hideModal } from "../../../actions";

export const StudentDashboardContainer = () => {
  const dispatch = useDispatch();
  const dispatchToProps = {
    showModal: useCallback((type, props) => dispatch(showModal(type, props)), [
      dispatch,
    ]),
    hideModal: useCallback(() => dispatch(hideModal()), [dispatch]),
  };

  const stateToProps = useSelector((state) => {
    return {
      onGoingCoachingSessions: onGoingSessionsSelector(state),
      coachingSessions: allCoachingSessionsSelector(state),
    };
  });

  return <StudentDashboard {...stateToProps} {...dispatchToProps} />;
};
