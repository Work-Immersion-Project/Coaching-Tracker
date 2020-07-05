import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@material-ui/core";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { closeDrawer } from "../../actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#95A3B3",
    color: "white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const AdminDrawer = ({ isDrawerOpen, closeDrawer }) => {
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
      path: "/coaching-log",
    },
    {
      text: "Teacher List",
      icon: <FaceIcon />,
      path: "/teacher-list",
    },
    {
      text: "Student List",
      icon: <SchoolIcon />,
      path: "/student-list",
    },
  ];

  const renderListItems = () => {
    return drawerItems.map((item) => {
      const { path, text, icon } = item;
      return (
        <ListItem
          button
          component={Link}
          to={{ pathname: `/admin${path}`, state: { text: text } }}
          key={text}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      );
    });
  };

  return (
    <>
      <Hidden smUp>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={isDrawerOpen}
          onClose={closeDrawer}
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.toolbar} />
          {renderListItems()}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          {renderListItems()}
        </Drawer>
      </Hidden>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpen: state.isDrawerOpen,
  };
};

export default connect(mapStateToProps, {
  closeDrawer,
})(AdminDrawer);
