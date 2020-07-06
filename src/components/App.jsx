import React, { useEffect } from "react";
import _ from "lodash";
import { Route, Switch, Router } from "react-router-dom";
import { initializeGapiAuth, signIn } from "../actions";
import { connect } from "react-redux";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import TeacherPage from "./teacher_page/TeacherPage";
import history from "../history";
import app from "../firebase";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

const App = (props) => {
  const { gapiAuth, auth, initializeGapiAuth } = props;
  if (gapiAuth && !auth) {
    const isSignedIn = gapiAuth.isSignedIn.get();
    if (isSignedIn) {
      // Get the current logged in user.
      const gapiCurrentUser = gapiAuth.currentUser.get();
      const { access_token } = gapiCurrentUser.getAuthResponse();
      app.auth().onAuthStateChanged(async (user) => {
        if (user) {
          props.signIn(user.email, user.uid, access_token);
        }
      });
    }
  }

  useEffect(() => {
    initializeGapiAuth();
  }, [initializeGapiAuth]);

  return !props.gapiAuth ? null : (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute path="/admin" component={AdminPage} />
        <Route path="/teacher" component={TeacherPage} />
        <Route component={LoginPage} />
      </Switch>
    </Router>
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
  signIn,
})(App);
