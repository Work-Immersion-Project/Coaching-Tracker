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
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  ViewSwitcher,
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
    padding: "1em",
    backgroundColor: "#4B4E6D",
  },
  scheduler: {
    height: "100%",
  },
}));

const handleCellOnClick = (cell) => {
  console.log(cell);
};

const WeekTableCell = (props) => {
  return (
    <WeekView.TimeTableCell
      {...props}
      onClick={() => {
        handleCellOnClick(props);
      }}
    />
  );
};

const DayTableCell = (props) => {
  return (
    <DayView.TimeTableCell
      {...props}
      onClick={() => {
        handleCellOnClick(props);
      }}
    />
  );
};

const MonthTableCell = (props) => {
  return (
    <MonthView.TimeTableCell
      {...props}
      onClick={() => {
        handleCellOnClick(props);
      }}
    />
  );
};

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
        <Paper className={classes.scheduler}>
          <Scheduler height="auto" data={props.calendarEvents}>
            <Toolbar />
            <ViewState
              defaultCurrentDate={currentDate}
              defaultCurrentViewName="Week"
            />
            <ViewSwitcher />

            <MonthView timeTableCellComponent={MonthTableCell} />
            <DayView
              startDayHour={1}
              endDayHour={24}
              timeTableCellComponent={DayTableCell}
            />
            <WeekView
              startDayHour={1}
              endDayHour={24}
              timeTableCellComponent={WeekTableCell}
            />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
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
