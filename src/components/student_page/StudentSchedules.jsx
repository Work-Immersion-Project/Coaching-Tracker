import React from "react";
import { connect } from "react-redux";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomScheduler from "../custom/CustomScheduler";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100%",
    width: "100%",
    padding: "1em",
    overflow: "hidden",
    backgroundColor: "#4B4E6D",
  },
  scheduler: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
}));

const StudentSchedules = (props) => {
  const classes = useStyles();
  const renderContent = () => {
    if (props.coachingSchedules) {
      return (
        <Paper className={classes.scheduler}>
          <CustomScheduler
            accessType="student"
            className={classes.scheduler}
            calendarEvents={props.coachingSchedules}
          />
        </Paper>
      );
    }
    return <CircularProgress />;
  };

  return (
    <Grid
      className={classes.content}
      container
      justify="center"
      alignItems="center"
    >
      {renderContent()}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingSchedules: state.coaching.coachingSchedules,
  };
};

export default connect(mapStateToProps)(StudentSchedules);
