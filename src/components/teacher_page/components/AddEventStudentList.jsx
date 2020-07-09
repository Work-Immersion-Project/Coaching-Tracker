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
import { removeCoachingAttendee } from "../../../actions";

const AddEventStudentList = (props) => {
  const renderStudentList = () => {
    return props.addedStudents.map((student) => {
      return (
        <ListItem key={student.email} dense>
          <ListItemText>{student.email}</ListItemText>
          <ListItemSecondaryAction>
            <IconButton onClick={() => props.removeCoachingAttendee(student)}>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return <List dense>{renderStudentList()}</List>;
};

const mapStateToProps = (state) => {
  return {
    addedStudents: state.coaching.selectedStudentAttendees,
  };
};

export default connect(mapStateToProps, {
  removeCoachingAttendee,
})(AddEventStudentList);
