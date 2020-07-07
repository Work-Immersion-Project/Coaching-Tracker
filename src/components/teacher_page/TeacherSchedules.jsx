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
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  TodayButton,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TeacherDrawer from "./TeacherDrawer";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
    width: "100%",
    padding: "0 1em",
    backgroundColor: "#4B4E6D",
  },
  scheduler: {
    height: "50%",
    width: "100%",
  },
}));

const TeacherSchedules = (props) => {
  const classes = useStyles();
  const today = new Date();
  const currentDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    props.getCalendarEvents();
  }, []);

  const renderContent = () => {
    if (props.calendarEvents) {
      return (
        <Paper>
          <Scheduler data={props.calendarEvents}>
            <ViewState defaultCurrentDate={currentDate} />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip />
          </Scheduler>
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
