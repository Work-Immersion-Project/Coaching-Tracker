import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch, Switch, Redirect } from "react-router-dom";
import CustomAppbar from "../custom/CustomAppbar";
import TeacherDashboard from "./TeacherDashboard";
import TeacherDrawer from "./TeacherDrawer";
import TeacherSchedules from "./TeacherSchedules";
import NotificationPage from "../NotificationPage";
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
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <TeacherDrawer />
      <div className={classes.content}>
        <CustomAppbar />
        <Switch>
          <Route path={`${path}`} exact>
            <TeacherDashboard />
          </Route>
          <Route path={`${path}/schedules`} exact>
            <TeacherSchedules />
          </Route>
          <Route path={`${path}/notifications`} exact>
            <NotificationPage />
          </Route>
          <Redirect to={`${path}`} />
        </Switch>
      </div>
      <AddEventDrawer />
    </div>
  );
};

export default TeacherPage;
