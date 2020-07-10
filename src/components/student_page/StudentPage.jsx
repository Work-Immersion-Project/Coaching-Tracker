import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import StudentAppBar from "./components/StudentAppbar";
import StudentDrawer from "./StudentDrawer";
import StudentSchedules from "./StudentSchedules";
import StudentTeacherList from "./StudentTeacherList";
// import AddEventDrawer from "./components/AddEventDrawer";

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

const StudentPage = () => {
  let { path } = useRouteMatch();
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <StudentDrawer />
      <div className={classes.content}>
        <StudentAppBar />
      <Route path={`${path}`} exact>
          <StudentDashboard />
      </Route>
      <Route path={`${path}/schedules`} exact>
        <StudentSchedules />
      </Route>
      <Route path={`${path}/teacher-list`} exact>
        <StudentTeacherList />
      </Route>
      </div>
      {/* <AddEventDrawer /> */}
    </div>
  );
};

export default StudentPage;
