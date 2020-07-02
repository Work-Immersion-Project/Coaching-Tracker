import React from "react";
import _ from "lodash";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (props.currentUser == null || _.isEmpty(props.currentUser)) {
          return <Redirect to="/login" {...routeProps} />;
        } else {
          return <RouteComponent {...routeProps} />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
