import React, { useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import history from "../history";
import { initializeGapiAuth } from "../actions";

import PrivateRoute from "./PrivateRoute";
import "./App.css";
import { connect } from "react-redux";

const App = (props) => {
  useEffect(() => {
    props.initializeGapiAuth();
  }, []);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/admin" component={AdminPage} />
        <Route component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default connect(null, {
  initializeGapiAuth,
})(App);
