import React from "react";
import { useSelector } from "react-redux";
import {
  onGoingSessionsSelector,
  allCoachingSessionsSelector,
} from "../../../selectors";
import TeacherDashboard from "./TeacherDashboard";

const TeacherDashboardContainer = () => {
  const stateToProps = useSelector((state) => {
    return {
      onGoingCoachingSessions: onGoingSessionsSelector(state),
      coachingSessions: allCoachingSessionsSelector(state),
    };
  });

  return <TeacherDashboard {...stateToProps} />;
};

export default TeacherDashboardContainer;
