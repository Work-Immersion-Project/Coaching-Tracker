import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#4B4E6D",
  },
  colorCard: {
    height: "10em",
    width: "20em",
    backgroundColor: "#84DCC6",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const StudentDashboard = (props) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.content}
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid>
        <Card className={classes.colorCard}>
          <CardContent>
            <Typography align="center" variant="h3">
              Jose Marjosep
            </Typography>
            <Typography align="center" variant="h5">
              Student Name
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card className={classes.colorCard}>
          <CardContent>
            <Typography align="center" variant="h3">
              5
            </Typography>
            <Typography align="center" variant="h5">
              Sessions Attended
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card className={classes.colorCard}>
          <CardContent>
            <Typography align="center" variant="h3">
              01
            </Typography>
            <Typography align="center" variant="h5">
              Pending Sessions
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

/*const mapStateToProps = (state) => {
  return {
    pendingSessionsCount: state.coaching.coachingSchedules.filter(
      (schedules) => schedules.status === "pending"
    ).length,
    studentsCoachedCount: state.coaching.coachingSchedules.filter(
      (schedules) => schedules.status === "finished"
    ).length,
  };
};*/

export default StudentDashboard;
