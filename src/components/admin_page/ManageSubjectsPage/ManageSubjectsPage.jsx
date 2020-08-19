import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Chip, createMuiTheme, ThemeProvider } from "@material-ui/core";
import MaterialTable, { MTableHeader } from "material-table";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    width: "100%",
    boxSizing: "border-box",
  },
  table: {
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    
  },
  fontColor: {
    color: "white",
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


const ManageSubjectsPage = ({
  getSubjects,
  addSubject,
  hideModal,
  showModal,
  subjects,
}) => {
  const tableTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#ff9100",
      },
    },
    overrides: {
      MuiPaper: {
        rounded: "20px",
        root: {
          color: "white",
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

  const classes = useStyles();

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
    <ThemeProvider theme={tableTheme}>
      <div className={classes.root}>
        <MaterialTable
          className={classes.table}
          data={subjects ? subjects : []}
          title="Subjects"
          columns={[
            { title: "Subject Name", field: "subjectName" },
            {
              title: "Assigned Teacher",
              field: "assignedTeachers",
              render: ({ assignedTeachers }) =>
                !assignedTeachers
                  ? ""
                  : assignedTeachers.map((teacher) => (
                      <Chip
                        className={classes.teacherChip}
                        label={teacher.email}
                        key={teacher.email}
                      />
                    )),
            },
            {
              title: "Enrolled Students",
              field: "enrolledStudents",
              render: ({ enrolledStudents }) =>
                !enrolledStudents
                  ? ""
                  : enrolledStudents.map((student) => (
                      <Chip
                        className={classes.studentChip}
                        label={student.email}
                        key={student.email}
                      />
                    )),
            },
          ]}
          isLoading={!subjects}
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
      </div>
    </ThemeProvider>
  );
};

export default ManageSubjectsPage;
