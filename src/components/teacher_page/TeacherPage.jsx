import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch, Switch, Redirect } from "react-router-dom";

import AddEventDrawerContainer from "./components/AddEventDrawer/AddEventDrawerContainer";
import TeacherDashboardContainer from "./TeacherDashboard/TeacherDashboardContainer";
import InterweaveBG from "../custom/svgs/interweave.svg";
import TeacherSchedulesContainer from "./TeacherSchedules/TeacherSchedulesContainer";
import TeacherDrawerContainer from "./TeacherDrawer/TeacherDrawerContainer";
import NotificationPageContainer from "../notification_page/NotificationPageContainer";

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

const TeacherPage = ({
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
    getCoachingSchedules(false);
  }, [getCoachingSchedules]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <div className={classes.container}>
      <TeacherDrawerContainer />

      <div className={classes.background}>
        <div className={classes.content}>
          <Switch>
            <Route
              path={`${path}`}
              exact
              component={TeacherDashboardContainer}
            />

            <Route
              path={`${path}/schedules/:id?`}
              exact
              component={TeacherSchedulesContainer}
            />

            <Route
              path={`${path}/notifications`}
              exact
              component={NotificationPageContainer}
            />

            <Redirect to={`${path}`} />
          </Switch>
        </div>
      </div>

      <AddEventDrawerContainer />
    </div>
  );
};

export default TeacherPage;
