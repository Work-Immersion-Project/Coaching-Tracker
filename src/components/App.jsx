import React, { useEffect, useCallback } from "react";
import { Route, Switch, Router } from "react-router-dom";
import { checkAuth, gapiInitRequest, checkAuthRequest } from "../actions";
import { connect } from "react-redux";
import MomentUtils from "@material-ui/pickers/adapter/moment";
import { LocalizationProvider } from "@material-ui/pickers";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import TeacherPage from "./teacher_page/TeacherPage";
import StudentPage from "./student_page/StudentPage";
import history from "../history";
import PrivateRoute from "./PrivateRoute";
import ModalRoot from "./ModalRoot";
import AlertRoot from "./AlertRoot";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { GAPI_INIT_REQUEST } from "../types";

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
            component={TeacherPage}
          />
          <PrivateRoute path="/Coaching-Tracker/admin" component={AdminPage} />
          <PrivateRoute
            path="/Coaching-Tracker/student"
            component={StudentPage}
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
