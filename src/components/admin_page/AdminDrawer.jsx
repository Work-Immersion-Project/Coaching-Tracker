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
import { Link } from "react-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: "#95A3B3",
    width: drawerWidth,
    color: "white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "#95A3B3",
    padding: theme.spacing(3),
  },
}));

const AdminDrawer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <ListItem button component={Link} to="/admin" key="home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/registration"
          key="registration"
        >
          <ListItemIcon>
            <HowToRegIcon />
          </ListItemIcon>
          <ListItemText primary="Registration" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/coaching-log"
          key="coaching-log"
        >
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Coaching Log" />
        </ListItem>

        <ListItem
          button
          key="teacher-list"
          component={Link}
          to="/admin/teacher-list"
        >
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="Teacher List" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/student-list"
          key="student-list"
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Student List" />
        </ListItem>
      </Drawer>
    </div>
  );
};

export default AdminDrawer;
