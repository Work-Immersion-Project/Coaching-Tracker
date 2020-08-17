import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import LensIcon from "@material-ui/icons/Lens";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.2em",
    borderRadius: "20px",
    margin: "0.5em",
  },
  finished: {
    color: "#2e7d32",
  },

  pending: {
    color: "#00364D",
  },
  ongoing: {
    color: "#BDA911",
  },
  waiting: {
    color: "#0091ea",
  },
  waiting_for_student_confirmation: {
    color: "#0091ea",
  },
  cancelled: {
    color: "#7A1313",
  },
  denied: {
    color: "#7A1313",
  },
}));

export const CoachingSessionListItem = ({ coachingSessionDetails }) => {
  const classes = useStyles();

  if (coachingSessionDetails) {
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
            <LensIcon
              className={classes[coachingSessionDetails.status]}
              style={{ fontSize: 40 }}
            />
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
  } else {
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
            <LensIcon
              // className={classes[coachingSessionDetails.status]}
              style={{ fontSize: 40 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body1">Teacher</Typography>
          </Grid>
        </Grid>
        <Grid item container xs={7} alignItems="center" spacing={5}>
          <Grid item>
            <Typography variant="subtitle1">{`1 Student/s`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Start Date</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6"> - </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">End Date</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
