import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch, Switch, Redirect } from "react-router-dom";

import AdminCoachingLog from "./AdminCoachingLog";
import AdminDashboard from "./AdminDashboard";

import AdminDrawer from "./AdminDrawer";
import AdminRegistrationContainer from "./AdminRegistration/AdminRegistrationContainer";
import ManageStudentsPageContainer from "./ManageStudentsPage/ManageStudentsPageContainer";
import ManageTeachersPageContainer from "./ManageTeachersPage/ManageTeachersPageContainer";
import ManageSubjectsPageContainer from "./ManageSubjectsPage/ManageSubjectsPageContainer";
import InterweaveBG from "../custom/svgs/interweave.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    backgroundColor: "#222222",
  },
  content: {
    height: "100%",
    width: "100%",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    [theme.breakpoints.up("sm")]: {
      zIndex: "1201",
    },
    backgroundImage: `url(${InterweaveBG})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    backgroundPosition: "center center",
  },
}));

const AdminPage = () => {
  let { path } = useRouteMatch();
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AdminDrawer />

      <div className={classes.background}>
        <div className={classes.content}>
          <Switch>
            <Route path={`${path}`} exact>
              <AdminDashboard />
            </Route>
            <Route path={`${path}/registration`} exact>
              <AdminRegistrationContainer />
            </Route>
            <Route path={`${path}/manage-subjects`} exact>
              <ManageSubjectsPageContainer />
            </Route>
            <Route path={`${path}/coaching-log`} exact>
              <AdminCoachingLog />
            </Route>
            <Route path={`${path}/manage-teachers`} exact>
              <ManageTeachersPageContainer />
            </Route>
            <Route path={`${path}/manage-students`} exact>
              <ManageStudentsPageContainer />
            </Route>
            <Redirect to={path} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
