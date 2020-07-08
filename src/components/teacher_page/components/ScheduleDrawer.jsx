import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  Drawer,
  Grid,
  TextField,
  createMuiTheme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import AddEventForm from "./AddEventForm";
import { closeAddEventDrawer } from "../../../actions";

const drawerWidth = 280;

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
    backgroundColor: "#95A3B3",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: "100%",
    padding: "1em",
  },
  timePicker: {
    margin: "1em",
  },
  titleStyle: {
    color: "black",
  },
}));

const ScheduleDrawer = ({ addEventDrawerData, closeAddEventDrawer }) => {
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
        <Grid container className={classes.content} >
          <Typography variant="h6" align="center">
            ADD EVENT
          </Typography>
          <AddEventForm initialValues={initialValues} />
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
        onClose={closeAddEventDrawer}
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
})(ScheduleDrawer);
