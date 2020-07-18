import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

const AppointmentContent = withStyles({
  title: {
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "white",
  },
  textContainer: {
    lineHeight: 1,
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },
  time: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white",
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "white",
  },
  container: {
    width: "100%",
  },
})(({ data, classes, formatDate, style }) => {
  return (
    <Appointments.Container style={{ ...style }} data={data}>
      <div className={classes.container}>
        <div className={classes.title}>{data.title}</div>
        <div className={classes.text}>{data.location}</div>
        <div className={classes.textContainer}>
          <div className={classes.time}>
            {formatDate(data.startDate.toString(), {
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
          <div className={classes.time}>{" - "}</div>
          <div className={classes.time}>
            {formatDate(data.endDate.toString(), {
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
      </div>
    </Appointments.Container>
  );
});

export default AppointmentContent;
