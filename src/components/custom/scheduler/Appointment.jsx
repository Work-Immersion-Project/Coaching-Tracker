import React from "react";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  button: {
    color: theme.palette.background.default,
    padding: 0,
  },
  text: {
    paddingTop: theme.spacing(1),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const Appointment = ({
  children,
  data,
  classes,
  toggleVisibility,
  updateAppointmentTooltip,
  ...restProps
}) => {
  return (
    <Appointments.Appointment
      {...restProps}
      onClick={({ target }) => {
        toggleVisibility();
        updateAppointmentTooltip({
          target:
            target.parentElement.parentElement.parentElement.parentElement,
          data,
        });
      }}
    >
      {children}
    </Appointments.Appointment>
  );
};

export default withStyles(styles, { name: "Appointment" })(Appointment);
