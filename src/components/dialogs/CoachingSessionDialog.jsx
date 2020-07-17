import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { getCoachingSchedule } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: "#222222",
  },
  contentText: {
    color: "white",
  },
}));

const CoachingSessionDialog = ({
  open,
  onDialogClose,
  coachingSession,
  coachingSessionId,
  getCoachingSchedule,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCoachingSchedule(coachingSessionId);
  }, []);

  const renderContent = () => {
    if (_.isEmpty(coachingSession)) {
      return <CircularProgress />;
    }
    return (
      <>
        <DialogTitle className={classes.contentText}>
          {coachingSession.teacher.fullName}
        </DialogTitle>
        <DialogContentText className={classes.contentText}></DialogContentText>
        <DialogActions></DialogActions>
      </>
    );
  };
  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogContent className={classes.content}>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingSession: state.coaching.selectedCoachingSchedule,
  };
};

export default connect(mapStateToProps, {
  getCoachingSchedule,
})(CoachingSessionDialog);
