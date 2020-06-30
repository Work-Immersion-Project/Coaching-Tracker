import React from "react";
import { connect } from "react-redux";
import { makeStyles, fade, withStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";
import GoogleAuth from "../GoogleAuth";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4B4E6D",
  },
});

const LoginPage = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justify="center"
      className={classes.root}
    >
      <GoogleAuth />
      {props.isSignedIn ? <div>Welcome!</div> : <CircularProgress />}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps)(LoginPage);
