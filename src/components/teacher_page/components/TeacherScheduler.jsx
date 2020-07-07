import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ViewState } from "@devexpress/dx-react-scheduler";
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
import { connect, useDispatch } from "react-redux";
import { openAddEventDrawer } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  scheduler: {
    height: "100%",
  },
}));

const handleCellOnClick = (cellValues) => {
  console.log(cellValues);
  cellValues.dispatch(openAddEventDrawer());
};

const WeekTableCell = (props) => {
  const dispatch = useDispatch();
  return (
    <WeekView.TimeTableCell
      {...props}
      onClick={() => {
        handleCellOnClick({ ...props, dispatch });
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

const TeacherScheduler = ({ calendarEvents, openAddEventDrawer }) => {
  const classes = useStyles();
  const today = new Date();
  const currentDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return (
    <Scheduler data={calendarEvents}>
      <Toolbar />
      <ViewState
        defaultCurrentDate={currentDate}
        defaultCurrentViewName="Week"
      />
      <ViewSwitcher />
      <MonthView
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={MonthTableCell}
      />
      <DayView
        startDayHour={1}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={DayTableCell}
      />
      <WeekView
        startDayHour={1}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={WeekTableCell}
      />
      <DateNavigator />
      <TodayButton />
      <Appointments />
      <AppointmentTooltip showOpenButton showDeleteButton />
    </Scheduler>
  );
};

export default connect(null, {
  openAddEventDrawer,
})(TeacherScheduler);
