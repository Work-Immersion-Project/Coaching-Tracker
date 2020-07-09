import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";
import TeacherDashboard from "./TeacherDashboard";
import TeacherAppBar from "./components/TeacherAppBar";
import TeacherDrawer from "./TeacherDrawer";
import TeacherSchedules from "./TeacherSchedules";
import TeacherStudentList from "./TeacherStudentList";
import AddEventDrawer from "./components/AddEventDrawer";
import { getCoachingSchedules } from "../../actions";
import { useDispatch } from "react-redux";

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

const TeacherPage = () => {
  let { path } = useRouteMatch();
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoachingSchedules());
  }, []);
  return (
    <div className={classes.container}>
      <TeacherDrawer />
      <div className={classes.content}>
        <TeacherAppBar />
        <Route path={`${path}`} exact>
          <TeacherDashboard />
        </Route>

        <Route path={`${path}/schedules`} exact>
          <TeacherSchedules />
        </Route>
        <Route path={`${path}/student-list`} exact>
          <TeacherStudentList />
        </Route>
      </div>
      <AddEventDrawer />
    </div>
  );
};

export default TeacherPage;
