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
  toggleTooltipVisibility,
  updateAppointmentMeta,
  ...restProps
}) => {
  return (
    <Appointments.Appointment
      data={data}
      {...restProps}
      onClick={({ target }) => {
        toggleTooltipVisibility(true);
        updateAppointmentMeta({
          target: target,
          data,
        });
      }}
    >
      {children}
    </Appointments.Appointment>
  );
};

export default withStyles(styles, { name: "Appointment" })(Appointment);
