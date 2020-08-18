import React from "react";
import { useSelector } from "react-redux";
import StudentSchedules from "./StudentSchedules";
const StudentSchedulesContainer = () => {
  const stateToProps = useSelector((state) => {
    return {
      isLoading: state.coaching.isLoading,
      coachingSessions: state.coaching.coachingSchedules,
    };
  });

  return <StudentSchedules {...stateToProps} />;
};

export default StudentSchedulesContainer;
