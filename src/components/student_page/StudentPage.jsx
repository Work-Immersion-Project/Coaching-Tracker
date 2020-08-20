import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch, Redirect, Switch } from "react-router-dom";

import RequestEventDrawerContainer from "./components/RequestEventDrawer/RequestEventDrawerContainer";
import { StudentDashboardContainer } from "./StudentDashboard/StudentDashboardContainer";
import InterweaveBG from "../custom/svgs/interweave.svg";
import StudentSchedulesContainer from "./StudentSchedules/StudentSchedulesContainer";
import NotificationPageContainer from "../notification_page/NotificationPageContainer";
import StudentDrawerContainer from "./StudentDrawer/StudentDrawerContainer";
import { toast } from "react-toastify";
import NotifIMG from "../custom/img/ongoing_session_header.png";

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

const StudentPage = ({
  getCoachingSchedules,
  getNotifications,

  checkDesktopNotificationPermission,
}) => {
  let { path } = useRouteMatch();
  const classes = useStyles();

  useEffect(() => {
    checkDesktopNotificationPermission();
  }, [checkDesktopNotificationPermission]);

  useEffect(() => {
    getCoachingSchedules(true);
  }, [getCoachingSchedules]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <div className={classes.container}>
      <StudentDrawerContainer />

      <div className={classes.background}>
        <div className={classes.content}>
          <Switch>
            <Route path={`${path}`} exact>
              <StudentDashboardContainer />
            </Route>
            <Route path={`${path}/schedules`} exact>
              <StudentSchedulesContainer />
            </Route>
            <Route path={`${path}/notifications`} exact>
              <NotificationPageContainer />
            </Route>
            <Redirect to={path} />
          </Switch>
        </div>
      </div>
      <RequestEventDrawerContainer />
    </div>
  );
};

export default StudentPage;
