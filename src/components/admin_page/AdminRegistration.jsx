import React from "react";
import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";
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

const AdminRegistration = () => {
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
          <Paper elevation={3}>
            <Typography align="center">Registration Page</Typography>
          </Paper>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Username" />
          </form>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Password" />
          </form>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="ID" />
          </form>
          <Button variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminRegistration;
