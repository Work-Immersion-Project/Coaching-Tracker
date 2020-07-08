import React, { useState, useEffect } from "react";
import { getCalendarEvents } from "../../actions";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TeacherScheduler from "./components/TeacherScheduler";
import TeacherDrawer from "./TeacherDrawer";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
    width: "100%",
    padding: "1em",
    backgroundColor: "#4B4E6D",
  },
  scheduler: {
    height: "100%",
  },
}));

const TeacherSchedules = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getCalendarEvents();
  }, []);

  const renderContent = () => {
    if (props.calendarEvents) {
      return (
        <Paper className={classes.scheduler}>
          <TeacherScheduler calendarEvents={props.calendarEvents} />
        </Paper>
      );
    }
    return <CircularProgress />;
  };

  return (
    <Grid
      className={classes.content}
      container
      justify="center"
      alignItems="center"
    >
      {renderContent()}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    calendarEvents: state.calendar.data,
  };
};

export default connect(mapStateToProps, {
  getCalendarEvents,
})(TeacherSchedules);
