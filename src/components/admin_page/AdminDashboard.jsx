import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    width: "100%",
    boxSizing: "border-box",
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
