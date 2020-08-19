import React, { useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";

import MomentUtils from "@material-ui/pickers/adapter/moment";
import { LocalizationProvider } from "@material-ui/pickers";
import AdminPage from "./admin_page/AdminPage";
import TeacherPageContainer from "./teacher_page/TeacherPageContainer";
import StudentPageContainer from "./student_page/StudentPageContainer";
import history from "../history";
import PrivateRoute from "./PrivateRoute";
import ModalRoot from "./ModalRoot";
import AlertRoot from "./AlertRoot";
import "./App.css";
import LandingPageContainer from "./landing_page/LandingPageContainer";
import CookieConsent from "react-cookie-consent";
import { makeStyles, Typography, Button } from "@material-ui/core";
import { updateWebsockets } from "../actions";
const useStyles = makeStyles((theme) => ({
  consentContainer: {
    backgroundColor: "#222222",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    zIndex: "1202 !important",
  },
  consentButton: {
    backgroundColor: "#4EC8F4 ",
    borderRadius: "10px ",
  },
}));
const App = ({
  gapiAuthClient,
  checkAuthRequest,
  gapiInitRequest,
  updateWebsockets,
}) => {
  const classes = useStyles();

  useEffect(() => {
    updateWebsockets();
  }, []);

  useEffect(() => {
    if (gapiAuthClient) {
      checkAuthRequest();
    }
  }, [checkAuthRequest, gapiAuthClient]);

  useEffect(() => {
    gapiInitRequest();
  }, [gapiInitRequest]);

  return (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <ModalRoot />
      <AlertRoot />
      <Router history={history}>
        <Switch>
          <Route
            path="/Coaching-Tracker/login"
            component={LandingPageContainer}
            exact
          />
          <PrivateRoute
            path="/Coaching-Tracker/teacher"
            component={TeacherPageContainer}
          />
          <PrivateRoute path="/Coaching-Tracker/admin" component={AdminPage} />
          <PrivateRoute
            path="/Coaching-Tracker/student"
            component={StudentPageContainer}
          />
          <Route component={LandingPageContainer} />
        </Switch>
      </Router>
      <CookieConsent
        disableButtonStyles={true}
        containerClasses={classes.consentContainer}
        debug={true}
        ButtonComponent={(props) => (
          <Button {...props} className={classes.consentButton} />
        )}
      >
        <Typography>
          Our website uses cookies to ensure best user experience, and also this
          is needed for signin in.
        </Typography>
      </CookieConsent>
    </LocalizationProvider>
  );
};

export default App;
