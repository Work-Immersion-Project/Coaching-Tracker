import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import React from "react";

export const AppointmentTooltipHeader = withStyles({
  teacherTitle: {
    margin: "0.5em 0",
  },
  headerFontColor: {
    color: "#84DCC6",
  },
  emailFontColor: {
    color: "white",
  },
})(({ children, appointmentData, classes, accessType, ...restProps }) => {
  return (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <Grid container justify="flex-end" direction="column">
        <Grid
          className={classes.teacherTitle}
          item
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Typography
            className={classes.headerFontColor}
            variant="h6"
            align="center"
          >
            {appointmentData.teacher?.fullName}
          </Typography>
          <Typography
            className={classes.emailFontColor}
            variant="caption"
            align="center"
          >
            {appointmentData.teacher?.email}
          </Typography>
        </Grid>
      </Grid>
    </AppointmentTooltip.Header>
  );
});
