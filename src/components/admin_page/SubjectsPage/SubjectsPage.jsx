import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Chip,
} from "@material-ui/core";
import {
  hideModal,
  showModal,
  addSubject,
  getSubjects,
} from "../../../actions";
import _ from "lodash";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable, { MTableBody } from "material-table";
import SubjectsList from "./SubjectsList";
import AddSubjectForm from "./AddSubjectForm";

const sampleData = [
  {
    name: "English",
  },
  {
    name: "English",
  },
  {
    name: "English",
  },
];

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    padding: "1em",
  },
  tableContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  teacherChip: {
    margin: "0 0.25em",
  },
  studentChip: {
    margin: "0 0.25em",
  },
}));

const AdminSubjectsPage = (props) => {
  const classes = useStyles();

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

  const handleAddSubjectButton = () => {
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
          { title: "Subject Name", field: "subject_name" },
          {
            title: "Assigned Teacher",
            field: "teachers",
            render: (rowData) =>
              rowData.teachers.map((teacher) => (
                <Chip className={classes.teacherChip} label={teacher} />
              )),
          },
          {
            title: "Enrolled Students",
            field: "enrolledStudents",
            render: (rowData) =>
              rowData.enrolledStudents.map((student) => (
                <Chip className={classes.studentChip} label={student} />
              )),
          },
        ]}
        isLoading={!props.subjects}
        actions={[
          {
            icon: "add",
            tooltip: "Add Subject",
            isFreeAction: true,
            onClick: handleAddSubjectButton,
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
})(AdminSubjectsPage);
