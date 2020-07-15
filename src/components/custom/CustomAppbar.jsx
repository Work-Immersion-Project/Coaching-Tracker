import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { openDrawer, closeDrawer } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _, { split } from "lodash";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "white",
  },
  appBar: {
    background: "#333333",
  },
}));

const CustomAppbar = (props) => {
  const [title, setTitle] = useState("Admin");
  const classes = useStyles();

  const onMenuButtonClick = () => {
    if (props.isDrawerOpen) {
      props.closeDrawer();
    } else {
      props.openDrawer();
    }
  };

  useEffect(() => {
    const formattedPath = props.location.pathname
      .replace("/admin/", "/")
      .replace("/teacher/", "/")
      .replace("/student/", "/")
      .replace("/", "");

    const splittedPath = formattedPath.split("/");
    let appbarTitle = "";

    if (
      formattedPath !== "" &&
      formattedPath !== "teacher" &&
      formattedPath !== "student" &&
      formattedPath !== "admin"
    ) {
      if (splittedPath.length > 1) {
        appbarTitle = _.reduce(formattedPath.split("-"), (current, next) => {
          return (
            _.startCase(_.toLower(current)) + " " + _.startCase(_.toLower(next))
          );
        });
      } else {
        appbarTitle = _.startCase(_.toLower(splittedPath[0]));
      }
    } else {
      appbarTitle = "Dashboard";
    }
    setTitle(appbarTitle);
  }, [props.location.pathname]);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton className={classes.menuButton} onClick={onMenuButtonClick}>
          <MenuIcon />
        </IconButton>
        <Typography>{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpen: state.isDrawerOpen,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    openDrawer,
    closeDrawer,
  })(CustomAppbar)
);
