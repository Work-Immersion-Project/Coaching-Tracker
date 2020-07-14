import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Paper } from "@material-ui/core";
import { hideModal, showModal } from "../../../actions";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable, { MTableBody } from "material-table";
import SubjectsList from "./SubjectsList";
import AddSubjectForm from "./AddSubjectForm";

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
}));

const AdminSubjectsPage = (props) => {
  const classes = useStyles();

  const onDialogClose = () => {
    props.hideModal();
  };

  const handleOnSubmit = (values) => {
    // TODO: Integrate Add Subject functionality here.
    props.hideModal();
    console.log(values);
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
        title="Subjects"
        columns={[{ title: "Subject Name", field: "subject-name" }]}
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

export default connect(null, {
  hideModal,
  showModal,
})(AdminSubjectsPage);
