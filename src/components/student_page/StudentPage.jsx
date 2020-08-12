import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import StudentDrawer from "./StudentDrawer";
import StudentSchedules from "./StudentSchedules";
import CustomAppbar from "../custom/CustomAppbar";
import NotificationPage from "../NotificationPage";
import RequestEventDrawer from "./components/RequestEventDrawer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
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
      <div className={classes.content}>
        <CustomAppbar />
        <Route path={`${path}`} exact>
          <StudentDashboard />
        </Route>
        <Route path={`${path}/schedules`} exact>
          <StudentSchedules />
        </Route>
        <Route path={`${path}/notifications`} exact>
          <NotificationPage />
        </Route>
      </div>
      <RequestEventDrawer />
    </div>
  );
};

export default StudentPage;
