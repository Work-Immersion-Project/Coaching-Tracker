import React, { useEffect } from "react";
import { Grid, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
  getTeachers,
  showModal,
  hideModal,
  assignSubjectTeacher,
  removeSubjectTeacher,
} from "../../actions";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
    background: "#4B4E6D",
  },
}));

const ManageTeachersPage = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getTeachers();
  }, []);
  const onDialogClose = () => {
    props.hideModal();
  };
  const onRemoveSubjectPressed = (rowData, subjectName) => {
    props.showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Remove Subject?",
      content: `Are you sure you want to remove ${subjectName} from teacher?`,
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        props.removeSubjectTeacher(rowData, subjectName);
      },
    });
  };
  const onSubmit = (email, currentSubjects, values) => {
    props.hideModal();
    props.assignSubjectTeacher({
      ...values,
      subjects: [
        ...values.subjects,
        ...currentSubjects.map((subject) => {
          return { subjectName: subject };
        }),
      ],
      email,
    });
  };

  const onAssignSubjectsPressed = (_, rowData) => {
    console.log(rowData);
    props.showModal("ASSIGN_SUBJECT_FORM_MODAL", {
      currentSubjects: rowData.handledSubjects,
      onDialogClose: onDialogClose,
      title: `Assign Subjects to ${rowData.metadata.fullName}`,
      onNegativeClick: onDialogClose,
      onPositiveClick: (values) =>
        onSubmit(rowData.email, rowData.handledSubjects, values),
    });
  };

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
    >
      <MaterialTable
        title="Teachers"
        data={props.teachers ? props.teachers : []}
        isLoading={!props.teachers}
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
      />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers.data,
  };
};

export default connect(mapStateToProps, {
  getTeachers,
  showModal,
  hideModal,
  assignSubjectTeacher,
  removeSubjectTeacher,
})(ManageTeachersPage);