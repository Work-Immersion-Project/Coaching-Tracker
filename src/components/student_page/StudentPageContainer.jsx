import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCoachingSchedulesRequest } from "../../actions";
import StudentPage from "./StudentPage";

const StudentPageContainer = () => {
  const dispatch = useDispatch();
  const dispatchToProps = {
    getCoachingSchedulesRequest: useCallback(
      (isStudent) => dispatch(getCoachingSchedulesRequest(isStudent)),
      [dispatch]
    ),
  };

  return <StudentPage {...dispatchToProps} />;
};

export default StudentPageContainer;
