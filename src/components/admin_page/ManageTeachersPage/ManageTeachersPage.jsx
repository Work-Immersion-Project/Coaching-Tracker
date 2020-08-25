import React, { useEffect } from "react";
import {
  Typography,
  Chip,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MaterialTable, { MTableHeader } from "material-table";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    width: "100%",
    boxSizing: "border-box",
  },
}));

const formTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "30px",
      },
      root: {
        color: "#00364D",
        backgroundColor: "white"
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

const StyledTableHeader = withStyles({})(
  ({ children, classes, ...restProps }) => {
    return <MTableHeader className={classes.test} {...restProps} />;
  }
);

const ManageTeachersPage = ({
  teachers,
  getTeachersRequest,
  hideModal,
  showModal,
  assignSubjectToTeacherRequest,
  removeSubjectFromTeacherRequest,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getTeachersRequest(false);
  }, [getTeachersRequest]);
  const onDialogClose = () => {
    hideModal();
  };

  const onRemoveSubjectPressed = ({ teacherID, subjectID, subjectName }) => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Remove Subject?",
      content: `Are you sure you want to remove ${subjectName} from teacher?`,
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        removeSubjectFromTeacherRequest({ teacherID, subjectID });
      },
    });
  };

  const onSubmit = ({ ID }, values) => {
    hideModal();
    assignSubjectToTeacherRequest({
      ID,
      ...values,
      subjects: [...values.subjects],
    });
  };

  const onAssignSubjectsPressed = (_, rowData) => {
    showModal("ASSIGN_SUBJECT_FORM_MODAL", {
      currentSubjects: rowData.handledSubjects,
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
          title="Teachers"
          data={teachers ? teachers : []}
          isLoading={!teachers}
          components={{
            Header: (props) => <StyledTableHeader {...props} />,
          }}
          columns={[
            {
              title: "Teacher Name",
              field: "metadata",
              render: ({ metadata }) => (
                <Typography>{`${metadata.firstName} ${metadata.middleName} ${metadata.lastName}`}</Typography>
              ),
            },
            {
              title: "Handled Subjects",
              field: "handledSubjects",
              render: (rowData) =>
                rowData.handledSubjects
                  ? rowData.handledSubjects.map((subject) => (
                      <Chip
                        key={subject.ID}
                        label={subject.subjectName}
                        onDelete={() =>
                          onRemoveSubjectPressed({
                            subjectID: subject.ID,
                            teacherID: rowData.ID,
                            subjectName: subject.subjectName,
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

export default ManageTeachersPage;
