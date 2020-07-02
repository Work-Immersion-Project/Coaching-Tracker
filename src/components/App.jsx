import React from "react";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";

import PrivateRoute from "./PrivateRoute";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute path="/admin" component={AdminPage} />
        {/* <Route component={LoginPage} /> */}
      </Switch>
    </BrowserRouter>
  );
}
