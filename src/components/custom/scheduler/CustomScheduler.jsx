import React from "react";
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
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentTooltipHeader } from "./AppointmentTooltipHeader";
import MonthTableCell from "./MonthTableCell";
import DayTableCell from "./DayTableCell";
import WeekTableCell from "./WeekTableCell";
import AppointmentContent from "./AppointmentContent";
import { makeStyles } from "@material-ui/core";
import AppointmentContainer from "./Appointment/AppointmentContainer";
import AppointmentTooltipContentContainer from "./AppointmentTooltipContent/AppointmentTooltipContentContainer";
const statuses = [
  {
    text: "Pending",
    id: "pending",
    color: "#8C7E10",
  },
  {
    text: "Finished",
    id: "finished",
    color: "#2e7d32",
  },
  {
    text: "Cancelled",
    id: "cancelled",
    color: "#7A1313",
  },
  {
    text: "Request Denied",
    id: "denied",
    color: "#7A1313",
  },
  {
    text: "Waiting For Response",
    id: "waiting",
    color: "#BDA911",
  },
  {
    text: "Waiting For Student's Confirmation",
    id: "waiting_for_student_confirmation",
    color: "#BDA911",
  },
  {
    text: "Ongoing",
    id: "ongoing",
    color: "#0091ea",
  },
  {
    text: "Overdue",
    id: "overdue",
    color: "#C87142",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CustomScheduler = ({
  coachingSessions,
  openAddEventDrawer,
  accessType,
  onUpdateStatusButtonPressed,

  studentInstances,
  toggleTooltipVisibility,
  updateAppointmentMeta,
  tooltip,
}) => {
  const classes = useStyles();
  const resources = [
    {
      fieldName: "status",
      title: "Status",
      instances: statuses,
    },
    {
      fieldName: "students",
      title: "Students",
      allowMultiple: true,
      instances: studentInstances,
    },
  ];

  return (
    <Scheduler
      className={classes.root}
      data={coachingSessions}
      onCellClick={openAddEventDrawer}
    >
      <Toolbar />
      <ViewState
        defaultCurrentDate={new Date()}
        defaultCurrentViewName="Week"
      />

      <ViewSwitcher />
      <MonthView
        timeTableCellComponent={(props) => (
          <MonthTableCell {...props} onCellClick={openAddEventDrawer} />
        )}
      />
      <DayView
        startDayHour={0}
        endDayHour={24}
        timeTableCellComponent={(props) => (
          <DayTableCell {...props} onCellClick={openAddEventDrawer} />
        )}
      />
      <WeekView
        startDayHour={0}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={(props) => (
          <WeekTableCell {...props} onCellClick={openAddEventDrawer} />
        )}
      />
      <DateNavigator />
      <TodayButton />
      <Appointments
        appointmentContentComponent={AppointmentContent}
        appointmentComponent={AppointmentContainer}
      />
      <Resources data={resources} mainResourceName="status" />
      <AppointmentTooltip
        visible={tooltip.isVisible}
        onVisibilityChange={toggleTooltipVisibility}
        onAppointmentMetaChange={updateAppointmentMeta}
        appointmentMeta={{ target: tooltip.target, data: tooltip.data }}
        contentComponent={AppointmentTooltipContentContainer}
        headerComponent={(props) => (
          <AppointmentTooltipHeader {...props} accessType={accessType} />
        )}
      />
    </Scheduler>
  );
};

export default CustomScheduler;
