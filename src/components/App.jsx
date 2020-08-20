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
import moment from "moment";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  consentContainer: {
    backgroundColor: "#222222",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    zIndex: "1202 !important",
  },
  consentButton: {
    backgroundColor: "#4EC8F4 ",
    "&:hover": {
      backgroundColor: "#0097c1",
    },
    borderRadius: "10px ",
    marginRight: "1em",
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
    moment.updateLocale("en", {
      relativeTime: {
        ss: "%d secs",
        m: "a minute",
        mm: "%d mins",
      },
    });
  }, []);

  useEffect(() => {
    updateWebsockets();
  }, [updateWebsockets]);

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        draggable
        pauseOnHover
        limit={5}
        transition={Bounce}
      />
      <CookieConsent
        location="bottom"
        disableButtonStyles={true}
        containerClasses={classes.consentContainer}
        cookieName="coaching-tracker-cookie"
        sameSite="strict"
        ButtonComponent={(props) => (
          <Button {...props} className={classes.consentButton} />
        )}
      >
        <Typography>
          Our website uses cookies to ensure best user experience, and also this
          is needed for signing in.
        </Typography>
      </CookieConsent>
      <ModalRoot />
      <AlertRoot />
    </LocalizationProvider>
  );
};

export default App;
