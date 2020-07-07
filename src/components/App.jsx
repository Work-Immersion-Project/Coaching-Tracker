import React, { useEffect } from "react";
import _ from "lodash";
import { Route, Switch, Router } from "react-router-dom";
import { initializeGapiAuth, checkAuth } from "../actions";
import { connect } from "react-redux";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import TeacherPage from "./teacher_page/TeacherPage";
import history from "../history";
import app from "../firebase";
import PrivateRoute from "./PrivateRoute";
import ModalRoot from "./ModalRoot";
import "./App.css";

const App = (props) => {
  const { gapiAuth, checkAuth, initializeGapiAuth } = props;

  if (gapiAuth) {
    checkAuth(gapiAuth);
  }

  useEffect(() => {
    initializeGapiAuth();
  }, [initializeGapiAuth]);

  return !props.gapiAuth ? null : (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} exact />
          <Route path="/teacher" component={TeacherPage} />
          <PrivateRoute path="/admin" component={AdminPage} />
          <Route component={LoginPage} />
        </Switch>
      </Router>
      <ModalRoot />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.data,
    gapiAuth: state.gapi.gapiAuth,
  };
};

export default connect(mapStateToProps, {
  initializeGapiAuth,
  checkAuth,
})(App);
