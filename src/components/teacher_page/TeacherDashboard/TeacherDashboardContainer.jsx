import React from "react";
import { useSelector } from "react-redux";
import {
  onGoingSessionsSelector,
  normalCoachingSessionsSelector,
} from "../../../selectors";
import TeacherDashboard from "./TeacherDashboard";

const TeacherDashboardContainer = () => {
  const stateToProps = useSelector((state) => {
    return {
      onGoingCoachingSessions: onGoingSessionsSelector(state),
      coachingSessions: normalCoachingSessionsSelector(state),
    };
  });

  return <TeacherDashboard {...stateToProps} />;
};

export default TeacherDashboardContainer;
