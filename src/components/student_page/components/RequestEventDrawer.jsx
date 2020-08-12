import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import RequestEventForm from "./RequestEventForm";
import { closeAddEventDrawer } from "../../../actions";

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
    color: "#84DCC6",
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
          <RequestEventForm initialValues={initialValues} />
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
const mapStateToProps = (state) => {
  return {
    addEventDrawerData: state.drawer.addEventDrawer,
  };
};

export default connect(mapStateToProps, {
  closeAddEventDrawer,
})(RequestEventDrawer);
