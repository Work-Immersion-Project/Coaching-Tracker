import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const tempSubjects = [
  { title: "English" },
  { title: "Filipino" },
  { title: "Science" },
  { title: "History" },
  { title: "Research" },
];

const SubjectsList = () => {
  const renderSubjectList = () => {
    return tempSubjects.map((subj) => {
      return (
        <>
          <ListItem key={subj.title}>
            <ListItemText>{subj.title}</ListItemText>
            <ListItemSecondaryAction>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </>
      );
    });
  };

  return <List>{renderSubjectList()}</List>;
};

export default SubjectsList;
