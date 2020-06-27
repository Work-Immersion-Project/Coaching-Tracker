import React from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./login_page/LoginPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <LoginPage />
      </Route>
    </BrowserRouter>
  );
}
