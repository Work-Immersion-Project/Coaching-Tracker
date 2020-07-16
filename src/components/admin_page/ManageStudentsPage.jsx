import React, { useEffect } from "react";
import {
  getStudents,
  showModal,
  hideModal,
  assignStudentSubjects,
  removeStudentSubject,
} from "../../actions";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { Grid, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
    backgroundColor: "#4B4E6D",
  },
}));

const ManageStudentsPage = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getStudents();
  }, []);

  const onDialogClose = () => {
    props.hideModal();
  };

  const onSubmit = ({ email, metadata }, currentSubjects, values) => {
    props.hideModal();
    props.assignStudentSubjects({
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

  const onRemoveSubjectPressed = (rowData, subjectName) => {
    props.showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Remove Subject?",
      content: `Are you sure you want to remove ${subjectName} from student?`,
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        props.removeStudentSubject(rowData, subjectName);
      },
    });
  };

  const onAssignSubjectsPressed = (event, rowData) => {
    props.showModal("ASSIGN_SUBJECT_FORM_MODAL", {
      currentSubjects: rowData.enrolledSubjects,
      onDialogClose: onDialogClose,
      title: `Assign Subjects to ${rowData.metadata.fullName}`,
      onNegativeClick: onDialogClose,
      onPositiveClick: (values) =>
        onSubmit(rowData, rowData.enrolledSubjects, values),
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
        title="Students"
        data={props.students ? props.students : []}
        isLoading={!props.students}
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
              rowData.enrolledSubjects.map((subject) => (
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
    students: state.students.data,
  };
};

export default connect(mapStateToProps, {
  getStudents,
  hideModal,
  showModal,
  assignStudentSubjects,
  removeStudentSubject,
})(ManageStudentsPage);
