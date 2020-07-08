import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#4B4E6D",
  },
  calendarHead: {
    backgroundColor: "#95A3B3",
    color: "white",
  },
}));

const TeacherDashboard = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };

  const classes = useStyles();
  return (
    <Grid
      className={classes.content}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid>
        <Calendar
          className={classes.calendarHead}
          onChange={onChange}
          value={date}
        />
      </Grid>
    </Grid>
  );
};

export default TeacherDashboard;
