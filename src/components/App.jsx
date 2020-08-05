import React, { useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";
import { initializeGapiAuth, checkAuth, getNotifications } from "../actions";
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
import "./App.css";

const App = (props) => {
  const {
    gapiAuth,
    authData,
    checkAuth,
    initializeGapiAuth,
    getNotifications,
  } = props;

  if (gapiAuth && !authData) {
    checkAuth();
  }

  useEffect(() => {
    if (authData) {
      getNotifications();
    }
  }, [authData, getNotifications]);
  useEffect(() => {
    initializeGapiAuth();
  }, [initializeGapiAuth]);

  return !props.gapiAuth ? null : (
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

const mapStateToProps = (state) => {
  return {
    authData: state.auth.data,
    gapiAuth: state.gapi.gapiAuth,
  };
};

export default connect(mapStateToProps, {
  initializeGapiAuth,
  checkAuth,
  getNotifications,
})(App);
