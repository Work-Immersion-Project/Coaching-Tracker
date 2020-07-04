import React from "react";
import { AppBar, Toolbar, Hidden, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const AdminAppBar = (props) => {
  const { state } = props.location;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>{state.text}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(AdminAppBar);
