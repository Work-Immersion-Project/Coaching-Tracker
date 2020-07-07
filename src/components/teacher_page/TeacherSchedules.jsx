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
          <TeacherScheduler
            calendarEvents={props.calendarEvents}
            className={classes.scheduler}
          />
        </Paper>
      );
    }
    return <CircularProgress />;
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.content}
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
