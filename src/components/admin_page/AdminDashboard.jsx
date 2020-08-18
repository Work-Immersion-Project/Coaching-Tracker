import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "white",
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
    padding: "2em",
    [theme.breakpoints.up("sm")]: {
      zIndex: "1201",
    },
  },
}));

const AdminDashboard = (props) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    ></Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.data.user,
  };
};

export default connect(mapStateToProps)(AdminDashboard);
