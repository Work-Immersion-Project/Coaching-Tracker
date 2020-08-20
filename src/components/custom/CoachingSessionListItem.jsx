import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, ListItem } from "@material-ui/core";
import LensIcon from "@material-ui/icons/Lens";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  root: { borderRadius: "20px", margin: "0.5em" },
  paperWrapper: {
    width: "100%",
    display: "grid",

    gridTemplate: "1fr / 0.5fr auto",
    padding: "1.2em",
    borderRadius: "20px",
    margin: "0.5em",
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  bodyText: {
    fontWeight: 500,
    opacity: 0.5,
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
  overdue: {
    color: "#C87142",
  },
}));

export const CoachingSessionListItem = ({
  coachingSessionDetails,
  onCoachingSessionPressed,
}) => {
  const classes = useStyles();

  if (coachingSessionDetails) {
    return (
      <ListItem
        button
        className={classes.root}
        component={Paper}
        onClick={() => {
          onCoachingSessionPressed(coachingSessionDetails.ID);
        }}
      >
        <div className={classes.paperWrapper}>
          <div className={classes.titleWrapper}>
            <LensIcon
              className={classes[coachingSessionDetails.status]}
              style={{ fontSize: 40, marginRight: "0.5em" }}
            />

            <div>
              <Typography variant="h6">
                {coachingSessionDetails.title}
              </Typography>
              <Typography variant="body1">
                {coachingSessionDetails.teacher.metadata.fullName}
              </Typography>
            </div>
          </div>

          <div className={classes.contentWrapper}>
            <Typography className={classes.bodyText} variant="subtitle1">
              {`${coachingSessionDetails.studentAttendees.length} Student/s`}
            </Typography>

            <Typography
              className={classes.bodyText}
              variant="subtitle1"
            >{`${moment(coachingSessionDetails.startDate).format(
              "MMM DD, YYYY - hh:mm A"
            )}`}</Typography>

            <Typography className={classes.bodyText} variant="h6">
              -
            </Typography>

            <Typography
              className={classes.bodyText}
              variant="subtitle1"
            >{`${moment(coachingSessionDetails.startDate).format(
              "MMM DD, YYYY - hh:mm A"
            )}`}</Typography>
          </div>
        </div>
      </ListItem>
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
