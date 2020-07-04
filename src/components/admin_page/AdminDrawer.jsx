import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: "100%",
  },
  drawerPaper: {
    backgroundColor: "#95A3B3",
    color: "white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const AdminDrawer = () => {
  const classes = useStyles();
  const drawerItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Registration",
      icon: <HowToRegIcon />,
      path: "/registration",
    },
    {
      text: "Coaching Log",
      icon: <AssignmentIndIcon />,
      path: "coaching-log",
    },
    {
      text: "Teacher List",
      icon: <FaceIcon />,
      path: "teacher-list",
    },
    {
      text: "Student List",
      icon: <SchoolIcon />,
      path: "student-list",
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      {drawerItems.map((item) => {
        const { path, text, icon } = item;
        return (
          <ListItem button component={Link} to={`/admin${path}`}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
    </Drawer>
  );
};

export default AdminDrawer;
