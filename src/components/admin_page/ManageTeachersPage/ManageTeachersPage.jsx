import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Chip,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MaterialTable, { MTableHeader } from "material-table";
import { connect } from "react-redux";
import {
  getTeachers,
  showModal,
  hideModal,
  assignSubjectTeacher,
  removeSubjectTeacher,
} from "../../../actions";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
    background: "#4B4E6D",
  },
}));

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
  // const {
  //   getTeachers,
  //   hideModal,
  //   showModal,
  //   removeSubjectTeacher,
  //   assignSubjectTeacher,
  // } = props;

  useEffect(() => {
    getTeachersRequest(false);
  }, [getTeachersRequest]);
  const onDialogClose = () => {
    hideModal();
  };

  const onRemoveSubjectPressed = (rowData, subjectName) => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Remove Subject?",
      content: `Are you sure you want to remove ${subjectName} from teacher?`,
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        removeSubjectFromTeacherRequest({
          teacherDetails: rowData,
          subjectName,
        });
      },
    });
  };
  const onSubmit = ({ email, metadata }, currentSubjects, values) => {
    hideModal();
    assignSubjectToTeacherRequest({
      ...values,
      subjects: [
        ...values.subjects,
        ...currentSubjects.map((subject) => {
          return { subjectName: subject };
        }),
      ],
      email,
      metadata,
    });
  };

  const onAssignSubjectsPressed = (_, rowData) => {
    showModal("ASSIGN_SUBJECT_FORM_MODAL", {
      currentSubjects: rowData.handledSubjects,
      onDialogClose: onDialogClose,
      title: `Assign Subjects to ${rowData.metadata.fullName}`,
      onNegativeClick: onDialogClose,
      onPositiveClick: (values) =>
        onSubmit(rowData, rowData.handledSubjects, values),
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
                <Typography>{`${metadata.fullName}`}</Typography>
              ),
            },
            {
              title: "Handled Subjects",
              field: "handledSubjects",
              render: (rowData) =>
                rowData.handledSubjects.map((subject) => (
                  <Chip
                    key={subject}
                    label={subject}
                    onDelete={() => onRemoveSubjectPressed(rowData, subject)}
                  />
                )),
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

export default ManageTeachersPage;
