import React from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./login_page/LoginPage";
import AdminPage from "./admin_page/AdminPage";
import AdminUser from "./admin_page/AdminUser";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Route path="/admin" exact>
        <AdminPage />
      </Route>
      <Route path="/admin/coachinglog" exact></Route>
    </BrowserRouter>
  );
}
