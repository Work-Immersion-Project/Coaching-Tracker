import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Typography, Grid } from "@material-ui/core";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import CustomDatePicker from "../../custom/CustomDatePicker";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { closeAddEventDrawer } from "../../../actions";
import CustomTimePicker from "../../custom/CustomTimePicker";

const drawerWidth = 240;

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
    baccolor: "#95A3B3",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  formpads: {
    margin: "10px",
  },
}));

const ScheduleDrawer = ({ addEventDrawerData, closeAddEventDrawer }) => {
  const { isOpen, selectedDate } = addEventDrawerData;
  const classes = useStyles();

  const renderContent = () => {
    if (selectedDate) {
      return (
        <Grid>
          <form>
            <Field
              label="Start Date"
              name="startDate"
              dateFormat="MM/dd/yyyy"
              component={CustomDatePicker}
              className={classes.formpads}
            />
            <Field
              label="End Date"
              name="endDate"
              dateFormat="MM/dd/yyyy"
              component={CustomDatePicker}
              className={classes.formpads}
            />
            <Field
              label="Start Time"
              name="startTime"
              component={CustomTimePicker}
              className={classes.formpads}
            />
            <Field
              label="End Time"
              name="endTime"
              component={CustomTimePicker}
              className={classes.formpads}
            />
          </form>
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
  const selectedDate = state.drawer.addEventDrawer.selectedDate;

  return {
    addEventDrawerData: state.drawer.addEventDrawer,
    initialValues: {
      startDate: selectedDate?.startDate,
      endDate: selectedDate?.endDate,
      startTime: selectedDate?.startDate,
      endTime: selectedDate?.endDate,
    },
  };
};

const ScheduleDrawerWithReduxForm = reduxForm({
  form: "AddEventDrawerForm",
  enableReinitialize: true,
})(ScheduleDrawer);

export default connect(mapStateToProps, {
  closeAddEventDrawer,
})(ScheduleDrawerWithReduxForm);
