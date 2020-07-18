import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Chip, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { hideModal, showModal, addSubject, getSubjects } from "../../actions";
import { connect } from "react-redux";
import MaterialTable, { MTableHeader } from "material-table";

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

const StyledTableHeader = withStyles({})(
  ({ children, classes, ...restProps }) => {
    return <MTableHeader className={classes.test} {...restProps} />;
  }
);

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        color: "#84DCC6",
        backgroundColor: "#222222",
      },
    },
    MuiInput: {
      root: {
        color: "#84DCC6",
      },
      underline: {
        minWidth: "270px",
        "&:before": {
          borderBottom: "1px solid rgba(132, 220, 198, 1)",
        },
        "&:after": {
          borderBottom: `2px solid rgba(132, 220, 198, 1)`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid rgba(132, 220, 198, 1)`,
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "#84DCC6",
        "&$disabled": {
          color: "#222222",
        },
      },
      colorInherit: {
        color: "#84DCC6",
      },
    },

    MuiInputBase: {
      input: {
        color: "#84DCC6",
      },
    },
    MuiSelect: {
      icon: {
        color: "#84DCC6",
      },
    },
    MuiTypography: {
      caption: {
        color: "#84DCC6",
      },
    },
    MuiTableCell: {
      head: {
        color: "#84DCC6",
      },
    },
  },
});

const ManageSubjectsPage = (props) => {
  const classes = useStyles();
  const { getSubjects, hideModal, addSubject } = props;

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const onDialogClose = () => {
    hideModal();
  };

  const handleOnSubmit = (values) => {
    hideModal();
    addSubject(values);
  };

  const onAddSubjectPressed = () => {
    showModal("ADD_SUBJECT_FORM_MODAL", {
      onDialogClose: onDialogClose,
      title: "Add Subject",
      onNegativeClick: onDialogClose,
      onPositiveClick: (values) => handleOnSubmit(values),
    });
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="center"
      >
        <MaterialTable
          data={props.subjects ? props.subjects : []}
          title="Subjects"
          columns={[
            { title: "Subject Name", field: "subjectName" },
            {
              title: "Assigned Teacher",
              field: "teachers",
              render: (rowData) =>
                rowData.teachers === null && rowData.teachers.length === 0
                  ? ""
                  : rowData.teachers.map((teacher) => (
                      <Chip
                        className={classes.teacherChip}
                        label={teacher.email}
                      />
                    )),
            },
            {
              title: "Enrolled Students",
              field: "enrolledStudents",
              render: ({ enrolledStudents }) =>
                enrolledStudents && enrolledStudents.length === 0
                  ? ""
                  : enrolledStudents.map((student) => (
                      <Chip
                        className={classes.studentChip}
                        label={student.email}
                      />
                    )),
            },
          ]}
          isLoading={!props.subjects}
          components={{
            Header: (props) => <StyledTableHeader {...props} />,
          }}
          actions={[
            {
              icon: "add",
              tooltip: "Add Subject",
              isFreeAction: true,
              onClick: onAddSubjectPressed,
            },
          ]}
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
    subjects: state.subjects.data,
  };
};

export default connect(mapStateToProps, {
  hideModal,
  showModal,
  addSubject,
  getSubjects,
})(ManageSubjectsPage);
