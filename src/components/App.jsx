import React, { useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";
import { initializeGapiAuth, checkAuth } from "../actions";
import { connect } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import TeacherPage from "./teacher_page/TeacherPage";
import history from "../history";
import PrivateRoute from "./PrivateRoute";
import ModalRoot from "./ModalRoot";
import "./App.css";

const App = (props) => {
  const { gapiAuth, authData, checkAuth, initializeGapiAuth } = props;

  if (gapiAuth && !authData) {
    checkAuth();
  }

  useEffect(() => {
    initializeGapiAuth();
  }, [initializeGapiAuth]);

  return !props.gapiAuth ? null : (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} exact />
          <PrivateRoute path="/teacher" component={TeacherPage} />
          <PrivateRoute path="/admin" component={AdminPage} />
          <Route component={LoginPage} />
        </Switch>
      </Router>
      <ModalRoot />
    </MuiPickersUtilsProvider>
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
})(App);
