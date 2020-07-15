import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import StudentDrawer from "./StudentDrawer";
import StudentSchedules from "./StudentSchedules";
import StudentTeacherList from "./StudentTeacherList";
import CustomAppbar from "../custom/CustomAppbar";
import { getCoachingSchedules } from "../../actions";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoachingSchedules());
  }, []);

  return (
    <div className={classes.container}>
      <StudentDrawer />
      <div className={classes.content}>
        <CustomAppbar />
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
