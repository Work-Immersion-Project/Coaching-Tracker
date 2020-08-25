import React, { useEffect } from "react";
import MaterialTable, { MTableHeader } from "material-table";
import {
  Typography,
  Chip,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    width: "100%",
    boxSizing: "border-box",
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
          color: "#222222",
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

const ManageStudentsPage = ({
  getStudentsRequest,
  hideModal,
  showModal,
  students,
  assignStudentSubject,
  removeStudentSubjectRequest,
}) => {
  const classes = useStyles();
  useEffect(() => {
    getStudentsRequest();
  }, [getStudentsRequest]);

  const onDialogClose = () => {
    hideModal();
  };

  const onSubmit = ({ ID }, values) => {
    hideModal();
    assignStudentSubject({
      ID,
      ...values,
      subjects: [...values.subjects],
    });
  };

  const onRemoveSubjectPressed = ({ subjectName, subjectID, studentID }) => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Remove Subject?",
      content: `Are you sure you want to remove ${subjectName} from student?`,
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        removeStudentSubjectRequest({
          subjectID,
          studentID,
        });
      },
    });
  };

  const onAssignSubjectsPressed = (_, rowData) => {
    showModal("ASSIGN_SUBJECT_FORM_MODAL", {
      currentSubjects: rowData.enrolledSubjects,
      onDialogClose: onDialogClose,
      title: `Assign Subjects to ${rowData.metadata.fullName}`,
      onNegativeClick: onDialogClose,
      onPositiveClick: (values) => onSubmit(rowData, values),
    });
  };

  return (
    <ThemeProvider theme={formTheme}>
      <div className={classes.root}>
        <MaterialTable
          title="Students"
          data={students ? students : []}
          isLoading={!students}
          components={{
            Header: (props) => <StyledTableHeader {...props} />,
          }}
          columns={[
            {
              title: "Student Name",
              field: "metadata",
              render: ({ metadata }) => (
                <Typography>{`${metadata.firstName} ${metadata.middleName} ${metadata.lastName}`}</Typography>
              ),
            },
            {
              title: "Email",
              field: "email",
            },
            {
              title: "Course",
              field: "course",
            },
            {
              title: "Enrolled Subjects",
              field: "enrolledSubjects",
              render: (rowData) =>
                rowData.enrolledSubjects
                  ? rowData.enrolledSubjects.map((subject) => (
                      <Chip
                        key={subject.ID}
                        label={subject.subjectName}
                        onDelete={() =>
                          onRemoveSubjectPressed({
                            subjectName: subject.subjectName,
                            studentID: rowData.ID,
                            subjectID: subject.ID,
                          })
                        }
                      />
                    ))
                  : "No Subjects Enrolled",
            },
          ]}
          actions={[
            {
              icon: "assignment",
              tooltip: "Assign Subjects",
              onClick: onAssignSubjectsPressed,
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

export default ManageStudentsPage;
