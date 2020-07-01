import React from "react";
import { Link, BrowserRouter, Route, Switch, Router } from "react-router-dom";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import AdminUser from "./admin_page/AdminUser";
import AdminCoachingLog from "./admin_page/AdminCoachingLog";
import AdminRegistration from "./admin_page/AdminRegistration";
import AdminProfiles from "./admin_page/AdminProfiles";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <PrivateRoute path="/" component={LoginPage} exact />
      <Route path="/admin" exact component={AdminPage} />
      <Route path="/admin/registration" exact component={AdminRegistration} />
      <Route path="/admin/coaching-log" exact component={AdminCoachingLog} />
      <Route path="/admin/profiles" exact component={AdminProfiles} />
      
    </BrowserRouter>
  );
}
