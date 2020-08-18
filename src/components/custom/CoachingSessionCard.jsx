import React from "react";
import { makeStyles, Grid, Paper, Typography, Avatar } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  card: {
    height: 310,
    width: 255,
    borderRadius: "20px",
    gridTemplateRows: "auto 1fr auto",
    overflow: "hidden",
    "&:hover": {
      transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    margin: "0 0.5em",
  },
  header: {
    backgroundColor: "#222222",
    height: "50%",
  },
  content: {
    padding: "1em",
  },
  studentCount: {
    backgroundColor: "#4EC8F4",
    borderRadius: "10px",
    padding: "1em",
    fontWeight: "600",
  },
  studentProfiles: {
    width: 40,
    height: 40,
    borderRadius: "10px",
  },
  date: {
    fontWeight: "400",
    opacity: 0.5,
  },
}));

export const CoachingSessionCard = ({ coachingSessionDetails }) => {
  const classes = useStyles();

  const renderStudentProfiles = () => {
    return coachingSessionDetails.studentAttendees.map((student) => (
      <Grid
        item
        component={Avatar}
        alt={student.metadata.fullName}
        className={classes.studentProfiles}
        variant="rounded"
        src={student.metadata.profileUrl}
        key={student.ID}
      />
    ));
  };

  return (
    <Grid item>
      <Paper className={classes.card} component={Grid} container>
        <Grid className={classes.header} item xs={12}></Grid>
        <Grid
          className={classes.content}
          item
          container
          direction="column"
          justify="space-between"
          xs
        >
          <Grid item>
            <Typography variant="h6">{coachingSessionDetails.title}</Typography>
            <Typography className={classes.date} variant="subtitle1">
              {`${moment(coachingSessionDetails.startDate).format(
                "h:mm a"
              )} - ${moment(coachingSessionDetails.endDate).format("h:mm a")}`}
            </Typography>
          </Grid>
          <Grid item container justify="space-between" alignItems="center">
            <Grid item xs>
              <Typography variant="caption" className={classes.studentCount}>
                {`${coachingSessionDetails.studentAttendees.length} Student/s`}
              </Typography>
            </Grid>

            <Grid
              item
              container
              direction="row"
              xs
              component={AvatarGroup}
              max={3}
            >
              {renderStudentProfiles()}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
