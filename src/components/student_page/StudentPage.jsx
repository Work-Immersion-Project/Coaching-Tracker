import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";

import StudentDrawer from "./StudentDrawer";
import StudentSchedules from "./StudentSchedules";
import NotificationPage from "../NotificationPage";
import RequestEventDrawer from "./components/RequestEventDrawer";
import { StudentDashboardContainer } from "./StudentDashboard/StudentDashboardContainer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    backgroundColor: "#222222",
  },
});

const StudentPage = ({ getCoachingSchedulesRequest }) => {
  let { path } = useRouteMatch();
  const classes = useStyles();

  useEffect(() => {
    getCoachingSchedulesRequest(true);
  }, [getCoachingSchedulesRequest]);

  return (
    <div className={classes.container}>
      <StudentDrawer />

      <Route path={`${path}`} exact>
        <StudentDashboardContainer />
      </Route>
      <Route path={`${path}/schedules`} exact>
        <StudentSchedules />
      </Route>
      <Route path={`${path}/notifications`} exact>
        <NotificationPage />
      </Route>

      <RequestEventDrawer />
    </div>
  );
};

export default StudentPage;
