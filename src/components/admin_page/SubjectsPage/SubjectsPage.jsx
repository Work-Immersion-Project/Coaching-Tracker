import React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Divider, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable, { MTableToolbar } from "material-table";
import SubjectsList from "./SubjectsList";
import AddSubjectForm from "./AddSubjectForm";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    margin: "1em",
  },
  toolbar: {
    width: "100%",
  },
  toolbarWrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  },
}));

const AdminSubjectsPage = (props) => {
  const classes = useStyles();
  return (
    <MaterialTable
      className={classes.root}
      title="Subjects"
      columns={[{ title: "Subject Name", field: "subject-name" }]}
      actions={[
        {
          icon: "add",
          tooltip: "Add Subject",
          isFreeAction: true,
          onClick: (event) => console.log(event),
        },
      ]}
    />
  );
};

export default AdminSubjectsPage;
