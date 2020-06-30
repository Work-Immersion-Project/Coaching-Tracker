import React from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import AdminUser from "./admin_page/AdminUser";
import AdminCoachingLog from "./admin_page/AdminCoachingLog";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <PrivateRoute path="/" component={LoginPage} />

      <Route path="/admin" exact>
        <AdminPage />
      </Route>
      <Route path="/admin/coaching-log" exact>
        <AdminCoachingLog />
      </Route>
    </BrowserRouter>
  );
}
