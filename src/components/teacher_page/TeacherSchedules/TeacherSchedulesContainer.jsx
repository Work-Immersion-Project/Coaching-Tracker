import React from "react";
import { useSelector } from "react-redux";
import TeacherSchedules from "./TeacherSchedules";
const TeacherSchedulesContainer = () => {
  const stateToProps = useSelector((state) => {
    return {
      coachingSessions: state.coaching.coachingSchedules,
      isLoading: state.coaching.isLoading,
    };
  });

  return <TeacherSchedules {...stateToProps} />;
};

export default TeacherSchedulesContainer;
