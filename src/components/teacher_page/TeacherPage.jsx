import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch, Switch, Redirect } from "react-router-dom";

import TeacherDrawer from "./TeacherDrawer";
import TeacherSchedules from "./TeacherSchedules";
import NotificationPage from "../NotificationPage";
import AddEventDrawer from "./components/AddEventDrawer";
import TeacherDashboardContainer from "./TeacherDashboard/TeacherDashboardContainer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#222222",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
});

const TeacherPage = ({ getCoachingSchedulesRequest }) => {
  let { path } = useRouteMatch();
  const classes = useStyles();

  useEffect(() => {
    getCoachingSchedulesRequest(false);
  }, [getCoachingSchedulesRequest]);

  return (
    <div className={classes.container}>
      <TeacherDrawer />

      <Switch>
        <Route path={`${path}`} exact>
          <TeacherDashboardContainer />
        </Route>
        <Route path={`${path}/schedules`} exact>
          <TeacherSchedules />
        </Route>
        <Route path={`${path}/notifications`} exact>
          <NotificationPage />
        </Route>
        <Redirect to={`${path}`} />
      </Switch>

      <AddEventDrawer />
    </div>
  );
};

export default TeacherPage;
