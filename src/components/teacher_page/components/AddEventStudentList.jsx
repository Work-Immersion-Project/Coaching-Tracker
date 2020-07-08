import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { coachingListStudentRemove } from "../../../actions";

const AddEventStudentList = (props) => {
  const renderStudentList = () => {
    return props.addedStudents.map((student) => {
      return (
        <ListItem key={student.email}>
          <ListItemText>{student.email}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => props.coachingListStudentRemove(student)}
            >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return <List>{renderStudentList()}</List>;
};

const mapStateToProps = (state) => {
  return {
    addedStudents: state.coaching.coachingList,
  };
};

export default connect(mapStateToProps, {
  coachingListStudentRemove,
})(AddEventStudentList);
