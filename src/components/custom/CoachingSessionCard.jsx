import React from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Avatar,
  ListItem,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import HeaderIMG from "./img/ongoing_session_header.png";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  card: {
    height: 310,
    width: 255,
    minWidth: 255,
    minHeight: 310,
    borderRadius: "20px",
    display: "grid",
    gridTemplate: "1fr 1fr / 1fr",
    overflow: "hidden",
    "&:hover": {
      transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    padding: 0,
    placeSelf: "center",
  },
  header: {
    backgroundImage: `url(${HeaderIMG})`,

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    height: "100%",
    width: "100%",
  },

  content: {
    display: "grid",
    gridTemplate: "1fr 1fr/ 1fr",
    padding: "0.8em",
  },
  studentsInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  studentCount: {
    backgroundColor: "#4EC8F4",
    borderRadius: "10px",
    padding: "1em",
    fontWeight: "600",
  },
  studentProfiles: {
    width: 40,
    height: 40,
    borderRadius: "10px",
  },
  date: {
    fontWeight: "400",
    opacity: 0.5,
  },
  headerOverlay: {
    backgroundColor: "rgba(0, 54, 77, 0.75)",
    height: "100%",
    width: "100%",

    display: "grid",
    placeContent: "center",
  },
  subjectTitle: {
    fontWeight: 500,
    color: "white",
    mixBlendMode: "overlay",
  },
  titleDate: {},
}));

export const CoachingSessionCard = ({
  coachingSessionDetails,
  onCoachingSessionPressed,
}) => {
  const classes = useStyles();

  const renderStudentProfiles = () => {
    return coachingSessionDetails.studentAttendees.map((student) => (
      <Grid
        item
        component={Avatar}
        alt={student.metadata.fullName}
        className={classes.studentProfiles}
        variant="rounded"
        src={student.metadata.profileUrl}
        key={student.ID}
      />
    ));
  };

  return (
    <ListItem
      button
      className={classes.card}
      component={Paper}
      onClick={() => {
        onCoachingSessionPressed(coachingSessionDetails.ID);
      }}
    >
      <div className={classes.header}>
        <div className={classes.headerOverlay}>
          <Typography variant="h4" className={classes.subjectTitle}>
            {coachingSessionDetails.subject.subjectName}
          </Typography>
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.titleDate}>
          <Typography variant="h6">{coachingSessionDetails.title}</Typography>
          <Typography className={classes.date} variant="subtitle1">
            {`${moment(coachingSessionDetails.startDate).format(
              "h:mm a"
            )} - ${moment(coachingSessionDetails.endDate).format("h:mm a")}`}
          </Typography>
        </div>
        <div className={classes.studentsInfo}>
          <Typography variant="caption" className={classes.studentCount}>
            {`${coachingSessionDetails.studentAttendees.length} Student/s`}
          </Typography>
          <AvatarGroup>
            <Grid
              item
              component={Avatar}
              alt={coachingSessionDetails.teacher.metadata.fullName}
              className={classes.studentProfiles}
              variant="rounded"
              src={coachingSessionDetails.teacher.metadata.profileUrl}
              key={coachingSessionDetails.teacher.ID}
            />
            {renderStudentProfiles()}
          </AvatarGroup>
        </div>
      </div>
    </ListItem>
  );
};
