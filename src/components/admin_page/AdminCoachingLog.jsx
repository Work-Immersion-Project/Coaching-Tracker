import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Chip, createMuiTheme, ThemeProvider, Typography} from "@material-ui/core";
import { hideModal, showModal, getCoachingLogs } from "../../actions";
import _ from "lodash";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
    background: "#4B4E6D",
  },

  teacherChip: {
    margin: "0.25em",
  },
  studentChip: {
    margin: "0.25em",
  },
}));

const AdminCoachingLog = (props) => {
  const classes = useStyles();
  
  useEffect(() => {
    props.getCoachingLogs();
  }, []);



  return (

    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
    >
      <MaterialTable
        data={props.coachingLogs ? props.coachingLogs : []}
        title="Subjects"
        columns={[
          { title: "Status", field: "status",   render: (rowData) =>
   <Chip
            className={classes.teacherChip}
            label={rowData.status}
          /> },
          {
            title: "Assigned Teacher",
            field: "teacher",
            render: (rowData) =>
              rowData.teachers === null && rowData.teachers.length === 0
                ? ""
                :<Chip
                className={classes.teacherChip}
                label={rowData.teacher.email}
              />
          },
          {
            title: "Students",
            field: "studentAttendees",
            render: ({ studentAttendees }) =>
            studentAttendees && studentAttendees.length === 0
                ? ""
                : studentAttendees.map((student) => (
                    <Chip
                      className={classes.studentChip}
                      label={student.email}
                    />
                  )),
          },
          {
            title: "Start Date",
            field: "startDate",
            render: ({ startDate }) => <Typography>{moment(startDate).format('MMMM, DD, yyyy')}</Typography>
          },
          {
            title: "End Date",
            field: "endDate",
            render: ({ endDate }) => <Typography>{moment(endDate).format('MMMM, DD, yyyy')}</Typography>
          },
          {
            title: "Start Time",
            field: "startDate",
            render: ({ startDate }) => <Typography>{moment(startDate).format('HH:mm A')}</Typography>
          },
          {
            title: "End Time",
            field: "endDate",
            render: ({ endDate }) => <Typography>{moment(endDate).format('HH:mm A')}</Typography>
          },
        ]}
        isLoading={!props.coachingLogs}
       
      />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingLogs:state.coachingLog.data,
  };
};

export default connect(mapStateToProps, {
  hideModal,
  showModal,
  getCoachingLogs
})(AdminCoachingLog);
