import React, { useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";

import MomentUtils from "@material-ui/pickers/adapter/moment";
import { LocalizationProvider } from "@material-ui/pickers";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import TeacherPageContainer from "./teacher_page/TeacherPageContainer";
import StudentPageContainer from "./student_page/StudentPageContainer";
import history from "../history";
import PrivateRoute from "./PrivateRoute";
import ModalRoot from "./ModalRoot";
import AlertRoot from "./AlertRoot";

import "./App.css";

const App = ({
  gapiAuthClient,
  authData,
  checkAuthRequest,
  gapiInitRequest,
}) => {
  useEffect(() => {
    if (gapiAuthClient) {
      checkAuthRequest();
    }
  }, [checkAuthRequest, gapiAuthClient]);

  useEffect(() => {
    gapiInitRequest();
  }, [gapiInitRequest]);

  return !gapiAuthClient ? null : (
    <LocalizationProvider dateAdapter={MomentUtils}>
      <Router history={history}>
        <Switch>
          <Route path="/Coaching-Tracker/login" component={LoginPage} exact />
          <PrivateRoute
            path="/Coaching-Tracker/teacher"
            component={TeacherPageContainer}
          />
          <PrivateRoute path="/Coaching-Tracker/admin" component={AdminPage} />
          <PrivateRoute
            path="/Coaching-Tracker/student"
            component={StudentPageContainer}
          />
          <Route component={LoginPage} />
        </Switch>
      </Router>
      <ModalRoot />
      <AlertRoot />
    </LocalizationProvider>
  );
};

export default App;
