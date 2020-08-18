import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch, Redirect, Switch } from "react-router-dom";

import StudentDrawer from "./StudentDrawer";
import StudentSchedules from "./StudentSchedules";
import NotificationPage from "../NotificationPage";
import RequestEventDrawer from "./components/RequestEventDrawer";
import { StudentDashboardContainer } from "./StudentDashboard/StudentDashboardContainer";
import InterweaveBG from "../custom/svgs/interweave.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    backgroundColor: "#222222",
  },
  content: {
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    [theme.breakpoints.up("sm")]: {
      zIndex: "1201",
    },
    backgroundImage: `url(${InterweaveBG})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    backgroundPosition: "center center",
  },
}));

const StudentPage = ({ getCoachingSchedulesRequest }) => {
  let { path } = useRouteMatch();
  const classes = useStyles();

  useEffect(() => {
    getCoachingSchedulesRequest(true);
  }, [getCoachingSchedulesRequest]);

  return (
    <div className={classes.container}>
      <StudentDrawer />

      <div className={classes.background}>
        <div className={classes.content}>
          <Switch>
            <Route path={`${path}`} exact>
              <StudentDashboardContainer />
            </Route>
            <Route path={`${path}/schedules`} exact>
              <StudentSchedules />
            </Route>
            <Route path={`${path}/notifications`} exact>
              <NotificationPage />
            </Route>
            <Redirect to={path} />
          </Switch>
        </div>
      </div>
      <RequestEventDrawer />
    </div>
  );
};

export default StudentPage;
