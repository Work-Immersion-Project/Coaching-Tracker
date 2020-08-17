import React from "react";
import { Grid, Typography, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CoachingSessionCard } from "../../custom/CoachingSessionCard";
import { CoachingSessionListItem } from "../../custom/CoachingSessionListItem";

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

  onGoingSessionsWrapper: {
    width: "100%",
  },
  onGoingSessions: {
    borderRadius: "30px",
    marginTop: "1em",
    width: "100%",
    flexWrap: "nowrap",

    overflowY: "auto",
    // Scrollbar Related
    "&::-webkit-scrollbar": {
      height: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#222222",
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#4EC8F4",
      borderRadius: "20px",
    },
  },
  sessionsWrapper: {
    marginTop: "1.5em",
    width: "100%",
  },
  sessions: {
    borderRadius: "30px",
    width: "100%",
  },
}));

const TeacherDashboard = ({ onGoingCoachingSessions, coachingSessions }) => {
  const classes = useStyles();

  const renderOnGoingSessions = () => {
    return onGoingCoachingSessions.map((coachingSession) => (
      <CoachingSessionCard
        key={coachingSession.ID}
        coachingSessionDetails={coachingSession}
      />
    ));
  };

  const renderCoachingSessions = () => {
    return coachingSessions.map((coachingSession) => (
      <CoachingSessionListItem
        key={coachingSession.ID}
        coachingSessionDetails={coachingSession}
      />
    ));
  };

  return (
    <Grid className={classes.root} container direction="column">
      <Grid
        item
        container
        className={classes.onGoingSessionsWrapper}
        zeroMinWidth
      >
        <Typography variant="h5">Ongoing Sessions</Typography>
        <Grid
          item
          container
          className={classes.onGoingSessions}
          spacing={2}
          zeroMinWidth
        >
          {renderOnGoingSessions()}
        </Grid>
      </Grid>
      <Grid className={classes.sessionsWrapper} item container zeroMinWidth>
        <Typography variant="h5">Sessions</Typography>
        <Grid item container spacing={2} zeroMinWidth>
          <List className={classes.sessions}>{renderCoachingSessions()}</List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TeacherDashboard;
