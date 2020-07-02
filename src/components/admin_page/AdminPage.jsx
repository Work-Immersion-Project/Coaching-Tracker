import React from "react";
import { Button, TextField, Grid, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Route, useRouteMatch } from "react-router-dom";
import AdminUser from "./AdminUser";
import AdminCoachingLog from "./AdminCoachingLog";
import AdminRegistration from "./AdminRegistration";
import AdminProfiles from "./AdminProfiles";
import AdminDrawer from "./AdminDrawer";

const useStyles = makeStyles({
  buttonStyle: {
    backgroundColor: "red",
    color: "white",
  },
  content: {
    height: "100vh",
    width: "100%",
  },
});

const AdminPage = () => {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid item sm={2}>
        <AdminDrawer />
      </Grid>
      <Grid item sm={10}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Route path={`${path}`} exact>
            <div>Dash Board</div>
          </Route>
          <Route path={`${path}/registration`} exact>
            <AdminRegistration />
          </Route>
          <Route path={`${path}/coaching-log`} exact>
            <AdminCoachingLog />
          </Route>
          <Route path={`${path}/profile`} exact>
            <AdminProfiles />
          </Route>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
