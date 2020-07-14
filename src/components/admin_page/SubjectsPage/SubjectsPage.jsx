import React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Divider } from "@material-ui/core";
import MaterialTable from "material-table";
import SubjectsList from "./SubjectsList";
import AddSubjectForm from "./AddSubjectForm";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    margin: "1em",
  },
  card: {
    maxHeight: "100%",
    height: "100%",
    margin: "0.8em",
    padding: "1em",
  },
}));

const AdminSubjectsPage = (props) => {
  const classes = useStyles();
  return (
    <MaterialTable
      className={classes.root}
      title="Subjects"
      columns={[{ title: "Subject Name", field: "subject-name" }]}
    />
  );
};

export default AdminSubjectsPage;
