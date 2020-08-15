import React, { useEffect } from "react";
import MaterialTable, { MTableHeader } from "material-table";
import {
  Grid,
  Typography,
  Chip,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
    backgroundColor: "#4B4E6D",
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
        color: "white",
      },
    },
    MuiSelect: {
      icon: {
        color: "#84DCC6",
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
        color: "white !important",
      },
      head: {
        color: "#84DCC6",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "#84DCC6",
        "&$active": {
          color: "#84DCC6",
          "&& $icon": {
            color: "#84DCC6",
          },
        },
        "&:hover": {
          color: "#84DCC6",
        },
      },
    },
    MuiIcon: {
      fontSizeSmall: {
        color: "#84DCC6",
      },
    },
    MuiTablePagination: {
      root: {
        color: "white",
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

  const onRemoveSubjectPressed = (rowData, subjectName) => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Remove Subject?",
      content: `Are you sure you want to remove ${subjectName} from student?`,
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        removeStudentSubjectRequest({
          studentDetails: rowData,
          subjectName,
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
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="center"
      >
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
                          onRemoveSubjectPressed(rowData, subject.subjectName)
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
              backgroundColor: "#222222",
              color: "#84DCC6",
            },
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default ManageStudentsPage;
