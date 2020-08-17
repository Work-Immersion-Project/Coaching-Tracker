import React from "react";
import { useSelector } from "react-redux";
import {
  onGoingSessionsSelector,
  normalCoachingSessionsSelector,
} from "../../../selectors";
import StudentDashboard from "./StudentDashboard";

export const StudentDashboardContainer = () => {
  const stateToProps = useSelector((state) => {
    return {
      onGoingCoachingSessions: onGoingSessionsSelector(state),
      coachingSessions: normalCoachingSessionsSelector(state),
    };
  });

  return <StudentDashboard {...stateToProps} />;
};
