import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Chip,
  createMuiTheme,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { hideModal, showModal } from "../../actions";

import { connect } from "react-redux";
import moment from "moment";
import MaterialTable, { MTableHeader } from "material-table";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
  },

  teacherChip: {
    margin: "0.25em",
  },
  studentChip: {
    margin: "0.25em",
  },
}));

const StyledTableHeader = withStyles({})(
  ({ children, classes, ...restProps }) => {
    return <MTableHeader className={classes.test} {...restProps} />;
  }
);

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        color: "#4EC8F4",
        backgroundColor: "#222222",
      },
    },
    MuiInput: {
      root: {
        color: "#4EC8F4",
      },
      underline: {
        minWidth: "270px",
        "&:before": {
          borderBottom: "1px solid rgba(78,200,244, 1)",
        },
        "&:after": {
          borderBottom: `2px solid rgba(78,200,244, 1)`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid rgba(78,200,244, 1)`,
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "#4EC8F4",
        "&$disabled": {
          color: "#222222",
        },
      },
      colorInherit: {
        color: "#4EC8F4",
      },
    },

    MuiInputBase: {
      input: {
        color: "white",
      },
    },
    MuiSelect: {
      icon: {
        color: "#4EC8F4",
      },
    },
    MuiTypography: {
      root: {
        color: "white",
      },
      caption: {
        color: "white",
      },
    },
    MuiTableCell: {
      body: {
        color: "white",
      },
      head: {
        color: "#4EC8F4",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "#4EC8F4",
        "&$active": {
          color: "#4EC8F4",
          "&& $icon": {
            color: "#4EC8F4",
          },
        },
        "&:hover": {
          color: "#4EC8F4",
        },
      },
    },
    MuiIcon: {
      fontSizeSmall: {
        color: "#4EC8F4",
      },
    },
    MuiTablePagination: {
      root: {
        color: "white",
      },
    },
  },
});

const AdminCoachingLog = (props) => {
  const classes = useStyles();

  // useEffect(() => {
  //   getCoachingLogs();
  // }, [getCoachingLogs]);

  return (
    <ThemeProvider theme={formTheme}>
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
            {
              title: "Status",
              field: "status",
              render: (rowData) => (
                <Chip className={classes.teacherChip} label={rowData.status} />
              ),
            },
            {
              title: "Assigned Teacher",
              field: "teacher",
              render: (rowData) =>
                rowData.teachers === null && rowData.teachers.length === 0 ? (
                  ""
                ) : (
                  <Chip
                    className={classes.teacherChip}
                    label={rowData.teacher.email}
                  />
                ),
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
              render: ({ startDate }) => (
                <Typography>
                  {moment(startDate).format("MMMM, DD, yyyy")}
                </Typography>
              ),
            },
            {
              title: "End Date",
              field: "endDate",
              render: ({ endDate }) => (
                <Typography>
                  {moment(endDate).format("MMMM, DD, yyyy")}
                </Typography>
              ),
            },
            {
              title: "Start Time",
              field: "startDate",
              render: ({ startDate }) => (
                <Typography>{moment(startDate).format("HH:mm A")}</Typography>
              ),
            },
            {
              title: "End Time",
              field: "endDate",
              render: ({ endDate }) => (
                <Typography>{moment(endDate).format("HH:mm A")}</Typography>
              ),
            },
          ]}
          isLoading={!props.coachingLogs}
          components={{
            Header: (props) => <StyledTableHeader {...props} />,
          }}
          options={{
            headerStyle: {
              backgroundColor: "#222222",
              color: "#84DCC6",
            },
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    coachingLogs: state.coachingLog.data,
  };
};

export default connect(mapStateToProps, {
  hideModal,
  showModal,
})(AdminCoachingLog);
