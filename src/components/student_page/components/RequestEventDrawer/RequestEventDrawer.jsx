import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Grid, Typography } from "@material-ui/core";
import RequestEventFormContainer from "../RequestEventForm/RequestEventFormContainer";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#222222",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: "100%",
    padding: "1em",
    color: "#4EC8F4",
  },
  timePicker: {
    margin: "1em",
  },
}));

const RequestEventDrawer = ({ addEventDrawerData, closeAddEventDrawer }) => {
  const { isOpen, selectedDate } = addEventDrawerData;
  const classes = useStyles();

  const renderContent = () => {
    if (selectedDate) {
      const initialValues = {
        startDate: selectedDate.startDate,
        endDate: selectedDate.endDate,
        startTime: selectedDate.startDate,
        endTime: selectedDate.endDate,
      };
      return (
        <Grid container className={classes.content}>
          <Typography variant="h6" align="right">
            REQUEST EVENT
          </Typography>
          <RequestEventFormContainer selectedDate={initialValues} />
        </Grid>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        open={isOpen}
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => {
          closeAddEventDrawer();
        }}
        ModalProps={{
          keepMounted: true,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        {renderContent()}
      </Drawer>
    </div>
  );
};

export default RequestEventDrawer;
