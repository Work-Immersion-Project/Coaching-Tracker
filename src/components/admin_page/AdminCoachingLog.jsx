import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
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

const AdminCoachingLog = () => {
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
          <Button>Submit</Button>
          <Button>Submit</Button>
          <Button>Submit</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
