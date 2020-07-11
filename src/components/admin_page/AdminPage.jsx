import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";
import AdminCoachingLog from "./AdminCoachingLog";
import AdminRegistration from "./AdminRegistration";

import TeacherList from "./TeacherList";
import StudentList from "./StudentList";
import CustomAppbar from "../custom/CustomAppbar";
import AdminDrawer from "./AdminDrawer";

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
          <div>Dash Board</div>
        </Route>
        <Route path={`${path}/registration`} exact>
          <AdminRegistration />
        </Route>
        <Route path={`${path}/coaching-log`} exact>
          <AdminCoachingLog />
        </Route>
        <Route path={`${path}/teacher-list`} exact>
          <TeacherList />
        </Route>
        <Route path={`${path}/student-list`} exact>
          <StudentList />
        </Route>
      </div>
    </div>
  );
};

export default AdminPage;
