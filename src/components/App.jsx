import React, { useEffect, useCallback } from "react";
import { Route, Switch, Router } from "react-router-dom";
import { initializeGapiAuth, signIn, getUser } from "../actions";
import { connect } from "react-redux";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import history from "../history";
import app from "../firebase";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

const App = (props) => {
  const { gapiAuth, currentUser, initializeGapiAuth } = props;
  if (gapiAuth && !currentUser) {
    const isSignedIn = gapiAuth.isSignedIn.get();
    if (isSignedIn) {
      // Get the current logged in user.
      const currentUser = gapiAuth.currentUser.get();
      const { access_token } = currentUser.getAuthResponse();
      app.auth().onAuthStateChanged(async (user) => {
        if (user) {
          props.signIn();
          props.getUser(user.email, user.uid, access_token);
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
        <Route component={LoginPage} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    gapiAuth: state.gapi.gapiAuth,
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps, {
  initializeGapiAuth,
  signIn,
  getUser,
})(App);
