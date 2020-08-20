import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Badge,
} from "@material-ui/core";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";
import history from "../../../history";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    height: "100%",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#222222",
    color: "white",
    height: "100%",
  },

  imageContainer: {
    height: "100px",
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
  image: {
    width: "80%",
  },

  active: {
    width: "100%",
    margin: "0.3em 0",
    backgroundSize: "200% 300%",
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(255,255,255,1) 50%)",
    transition: "all 1s ease",

    borderRadius: "30px 0 0 30px",
    backgroundPosition: "right bottom",
    color: "#00364D",

    "& $icon": {
      color: "#00364D",
    },
  },
  icon: {
    color: "white",
  },
  inActive: {
    margin: "0.3em 0",
    backgroundSize: "200% 300%",
    backgroundImage:
      "linear-gradient(to right, rgba(0,0,0,0) 50%, rgba(255,255,255,1) 50%)",
    transition: "all 1s ease",

    "&:hover": {
      color: "#00364D",
      backgroundPosition: "right bottom",
      "& $icon": {
        color: "#00364D",
      },
    },
    borderRadius: "30px 0 0 30px",
  },
}));

const StudentDrawer = ({ notifications, showModal, hideModal, signOut }) => {
  const [selectedPath, setSelectedPath] = useState(history.location.pathname);
  const classes = useStyles();
  const drawerItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Schedules",
      icon: <CalendarTodayIcon />,
      path: "/schedules",
    },
    {
      text: "Notifications",
      icon: (
        <Badge badgeContent={notifications.length} color="primary">
          <NotificationsIcon />
        </Badge>
      ),
      path: "/notifications",
    },
  ];
  const onDialogClose = () => {
    hideModal();
  };

  const handleSignoutButton = () => {
    showModal("CONFIRMATION_MODAL", {
      onDialogClose: onDialogClose,
      title: "Sign Out",
      content: "Are you sure you want to sign out?",
      onNegativeClick: onDialogClose,
      onPositiveClick: () => {
        signOut();
        onDialogClose();
      },
    });
  };
  const renderListItems = () => {
    return drawerItems.map((item) => {
      const { path, text, icon } = item;
      const pathname = `/Coaching-Tracker/student${path}`;
      const formattedSelectedPath = selectedPath.endsWith("student")
        ? selectedPath + "/"
        : selectedPath;
      const isActive = formattedSelectedPath === pathname;
      return (
        <div
          className={isActive ? classes.active : classes.inActive}
          key={text}
        >
          <ListItem
            button
            component={Link}
            to={{
              pathname: pathname,
              state: { text: text },
            }}
            onClick={() => setSelectedPath(pathname)}
          >
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </div>
      );
    });
  };

  return (
    <>
      {/* <Hidden smUp>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={props.isDrawerOpen}
          onClose={props.closeDrawer}
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.imageContainer}>
            <img
              alt="CIIT LOGO"
              className={classes.image}
              src={process.env.PUBLIC_URL + "/ciit_logo.png"}
            />
          </div>
          {renderListItems()}
          <ListItem
            className={classes.inActive}
            button
            onClick={handleSignoutButton}
          >
            <ListItemIcon>
              <ExitToAppIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Drawer>
      </Hidden> */}
      <Hidden xsDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.imageContainer}>
            <img
              alt="CIIT LOGO"
              className={classes.image}
              src={process.env.PUBLIC_URL + "/ciit_logo.png"}
            />
          </div>
          {renderListItems()}
          <ListItem
            button
            onClick={handleSignoutButton}
            className={classes.inActive}
          >
            <ListItemIcon>
              <ExitToAppIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Drawer>
      </Hidden>
    </>
  );
};

export default StudentDrawer;
