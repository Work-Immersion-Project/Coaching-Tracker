import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  content: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#4B4E6D",
  },
  containerpaper: {
    backgroundColor: "#212642",
    padding: "20px",
  },
  line1: {
    color: "#f05545",
    paddingBottom: "15px",
  },
  line2: {
    color: "white",
  },
}));

const AccessRestriction = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.content}
    >
      <Paper elevation={3} className={classes.containerpaper}>
        <Typography variant="h3" align="center" className={classes.line1}>
          Error 403: Unauthorized Access
        </Typography>
        <Typography variant="h4" align="center" className={classes.line2}>
          You are currently logged in as a {props.user.type}
        </Typography>
        <Typography variant="h4" align="center" className={classes.line2}>
          Please sign in with the appropriate account
        </Typography>
      </Paper>
    </Grid>
  );
};

export default AccessRestriction;
