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
    overflow: "hidden",
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
        rounded: {
          borderRadius: "30px",
        },
        root: {
          color: "#00364D",
          backgroundColor: "white",
        },
      },
      MuiInput: {
        root: {
          color: "#00364D",
        },
        underline: {
          minWidth: "270px",
          "&:before": {
            borderBottom: "1px solid #00364D",
          },
          "&:after": {
            borderBottom: `2px solid #00364D`,
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottom: `2px solid #00364D`,
          },
        },
      },
      MuiIconButton: {
        root: {
          color: "#00364D",
          "&$disabled": {
            color: "#222",
          },
        },
        colorInherit: {
          color: "#00364D",
        },
      },

      MuiInputBase: {
        input: {
          color: "#00364D",
        },
      },
      MuiSelect: {
        icon: {
          color: "#00364D",
        },
      },
      MuiTypography: {
        caption: {
          color: "#00364D",
        },
      },
      MuiTableCell: {
        root: {
          borderBottomColor: "#00364D",
          fontFamily: "Robot, Helvetica, Arial, ans-serif !important"
        },
        body: {
          color: "#00364D",
        },
        head: {
          color: "#00364D",
        },
      },
      MuiTableSortLabel: {
        root: {
          color: "#00364D",
          "&$active": {
            color: "#00364D",
            "&& $icon": {
              color: "#00364D",
            },
          },
          "&:hover": {
            color: "#00364D",
          },
        },
      },
      MuiIcon: {
        fontSizeSmall: {
          color: "#00364D",
        },
      },
      MuiTablePagination: {
        root: {
          color: "#00364D",
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
              backgroundColor: "white",
              color: "#00364D",
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default ManageSubjectsPage;
