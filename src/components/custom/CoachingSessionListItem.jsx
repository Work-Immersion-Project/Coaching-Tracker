import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import LensIcon from "@material-ui/icons/Lens";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
    borderRadius: "20px",
  },

  pending: {
    color: "#8C7E10",
    fontSize: 40,
  },
  ongoing: {
    color: "#0091ea",
    fontSize: 40,
  },
  waiting: {
    color: "#BDA911",
    fontSize: 40,
  },
  waiting_for_student_confirmation: {
    color: "#BDA911",
    fontSize: 40,
  },
  cancelled: {
    color: "#7A1313",
    fontSize: 40,
  },
  denied: {
    color: "#7A1313",
    fontSize: 40,
  },
}));

export const CoachingSessionListItem = ({ coachingSessionDetails }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      component={Paper}
      item
      container
      alignItems="center"
    >
      <Grid item container xs={5} alignItems="center" spacing={5}>
        <Grid item>
          <LensIcon className={classes[coachingSessionDetails.status]} />
        </Grid>
        <Grid item>
          <Typography variant="h6">{coachingSessionDetails.title}</Typography>
          <Typography variant="body1">
            {coachingSessionDetails.teacher.metadata.fullName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={7} alignItems="center" spacing={5}>
        <Grid item>
          <Typography variant="subtitle1">
            {`${coachingSessionDetails.studentAttendees.length} Student/s`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{`${moment(
            coachingSessionDetails.startDate
          ).format("MMM DD, YYYY - hh:mm a")}`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6"> - </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{`${moment(
            coachingSessionDetails.startDate
          ).format("MMM DD, YYYY - hh:mm a")}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
