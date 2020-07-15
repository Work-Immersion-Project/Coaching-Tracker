import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Chip } from "@material-ui/core";
import { hideModal, showModal, addSubject, getSubjects } from "../../actions";
import _ from "lodash";
import { connect } from "react-redux";
import MaterialTable from "material-table";

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

const ManageSubjectsPage = (props) => {
  const classes = useStyles();
  console.log(props);
  useEffect(() => {
    props.getSubjects();
  }, []);

  const onDialogClose = () => {
    props.hideModal();
  };

  const handleOnSubmit = (values) => {
    // TODO: Integrate Add Subject functionality here.
    props.hideModal();
    props.addSubject(values);
  };

  const onAddSubjectPressed = () => {
    props.showModal("ADD_SUBJECT_FORM_MODAL", {
      onDialogClose: onDialogClose,
      title: "Add Subject",
      onNegativeClick: onDialogClose,
      onPositiveClick: (values) => handleOnSubmit(values),
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
        actions={[
          {
            icon: "add",
            tooltip: "Add Subject",
            isFreeAction: true,
            onClick: onAddSubjectPressed,
          },
        ]}
      />
    </Grid>
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
