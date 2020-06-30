import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => {
        console.log(props.currentUser);
        if (!props.currentUser) {
          return <RouteComponent {...routeProps} />;
        } else {
          if (props.currentUser.type === "admin") {
            return <Redirect to="/admin" {...routeProps} />;
          }
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
