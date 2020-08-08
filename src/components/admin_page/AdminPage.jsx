import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";
import ManageSubjectsPage from "./ManageSubjectsPage";
import ManageTeachersPage from "./ManageTeachersPage";
import ManageStudentsPage from "./ManageStudentsPage";
import AdminCoachingLog from "./AdminCoachingLog";
import AdminDashboard from "./AdminDashboard";
import CustomAppbar from "../custom/CustomAppbar";
import AdminDrawer from "./AdminDrawer";
import AdminRegistrationContainer from "./AdminRegistrationContainer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
});

const AdminPage = () => {
  let { path } = useRouteMatch();
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AdminDrawer />
      <div className={classes.content}>
        <CustomAppbar />
        <Route path={`${path}`} exact>
          <AdminDashboard />
        </Route>
        <Route path={`${path}/registration`} exact>
          <AdminRegistrationContainer />
        </Route>
        <Route path={`${path}/manage-subjects`} exact>
          <ManageSubjectsPage />
        </Route>
        <Route path={`${path}/coaching-log`} exact>
          <AdminCoachingLog />
        </Route>
        <Route path={`${path}/manage-teachers`} exact>
          <ManageTeachersPage />
        </Route>
        <Route path={`${path}/manage-students`} exact>
          <ManageStudentsPage />
        </Route>
      </div>
    </div>
  );
};

export default AdminPage;
