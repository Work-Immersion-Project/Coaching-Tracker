import React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { connectProps } from "@devexpress/dx-react-core";
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
import { connect } from "react-redux";
import {
  openAddEventDrawer,
  showModal,
  hideModal,
  updateCoachingScheduleStatus,
  confirmCoachingSchedule,
  updateAppointmentTooltip,
  showAppointmentTooltip,
  hideAppointmentTooltip,
} from "../../../actions";
import { AppointmentTooltipContent } from "./AppointmentTooltipContent";
import { AppointmentTooltipHeader } from "./AppointmentTooltipHeader";
import MonthTableCell from "./MonthTableCell";
import DayTableCell from "./DayTableCell";
import WeekTableCell from "./WeekTableCell";
import AppointmentContent from "./AppointmentContent";
import Appointment from "./Appointment";
import _ from "lodash";

const CustomScheduler = ({
  coachingSchedules,
  openAddEventDrawer,
  accessType,
  showModal,
  hideModal,
  updateCoachingScheduleStatus,
  loggedInUser,
  confirmCoachingSchedule,
  appointment,
  showAppointmentTooltip,
  hideAppointmentTooltip,
  updateAppointmentTooltip,
}) => {
  const studentInstances = _.flatten(
    coachingSchedules.map((schedule) =>
      schedule.studentAttendees.map((student) => {
        return {
          text: loggedInUser.email !== student.email ? student.fullName : "You",
          id: student.email,
          color: "red",
        };
      })
    )
  );

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
      id: "waiting_for_response",
      color: "#BDA911",
    },
    {
      text: "Overdue",
      id: "overdue",
      color: "#C87142",
    },
  ];

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

  const onDialogClose = () => {
    hideModal();
  };

  const onUpdateStatusButtonPressed = (eventId, status) => {
    let title = "";
    let content = "";
    if (status === "ongoing") {
      updateCoachingScheduleStatus(eventId, status);
    } else {
      if (status === "pending") {
        title = "Accept Schedule Request?";
        content = "Are you sure that you are available at this date?";
      } else if (status === "cancelled") {
        title = "Cancel Schedule?";
        content = "Are you sure that you want to cancel this session?";
      } else if (status === "denied") {
        title = "Deny Schedule Request?";
        content = "Are you sure that you want to deny this session?";
      }
      showModal("CONFIRMATION_MODAL", {
        onDialogClose: onDialogClose,
        title,
        content,
        onNegativeClick: onDialogClose,
        onPositiveClick: () => updateCoachingScheduleStatus(eventId, status),
      });
    }
  };

  const weekTableCell = connectProps(WeekTableCell, () => {
    return {
      onCellClick: openAddEventDrawer,
    };
  });

  const monthTableCell = connectProps(MonthTableCell, () => {
    return {
      onCellClick: openAddEventDrawer,
    };
  });

  const dayTableCell = connectProps(DayTableCell, () => {
    return {
      onCellClick: openAddEventDrawer,
    };
  });

  const appointmentHeader = connectProps(AppointmentTooltipHeader, () => {
    return { accessType };
  });

  const appointmentContent = connectProps(AppointmentTooltipContent, () => {
    return {
      accessType,
      onUpdateStatusButtonPressed,
      loggedInUser,
      confirmCoachingSchedule,
      hideAppointmentTooltip,
    };
  });
  const customAppointment = (props) => {
    return (
      <Appointment
        {...props}
        updateAppointmentTooltip={updateAppointmentTooltip}
        toggleVisibility={toggleVisibility}
      />
    );
  };

  const toggleVisibility = () => {
    if (appointment.visible) {
      hideAppointmentTooltip();
    } else {
      showAppointmentTooltip();
    }
  };

  return (
    <Scheduler
      height="auto"
      data={coachingSchedules}
      onCellClick={openAddEventDrawer}
    >
      <Toolbar />
      <ViewState
        defaultCurrentDate={new Date()}
        defaultCurrentViewName="Week"
      />

      <ViewSwitcher />
      <MonthView timeTableCellComponent={monthTableCell} />
      <DayView
        startDayHour={0}
        endDayHour={24}
        timeTableCellComponent={dayTableCell}
      />
      <WeekView
        startDayHour={0}
        endDayHour={24}
        onCellClick={openAddEventDrawer}
        timeTableCellComponent={weekTableCell}
      />
      <DateNavigator />
      <TodayButton />
      <Appointments
        appointmentContentComponent={AppointmentContent}
        appointmentComponent={customAppointment}
      />
      <Resources data={resources} mainResourceName="status" />
      <AppointmentTooltip
        visible={appointment.visible}
        onVisibilityChange={toggleVisibility}
        onAppointmentMetaChange={updateAppointmentTooltip}
        appointmentMeta={appointment.appointmentMeta}
        contentComponent={appointmentContent}
        headerComponent={appointmentHeader}
      />
    </Scheduler>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingSchedules: state.coaching.coachingSchedules,
    loggedInUser: state.auth.data.user,
    appointment: state.appointment,
  };
};
export default connect(mapStateToProps, {
  openAddEventDrawer,
  updateCoachingScheduleStatus,
  showModal,
  hideModal,
  confirmCoachingSchedule,
  updateAppointmentTooltip,
  showAppointmentTooltip,
  hideAppointmentTooltip,
})(CustomScheduler);
