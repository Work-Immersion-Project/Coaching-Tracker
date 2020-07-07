import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import AccessRestriction from "./AccessRestriction";

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (!props.isSignedIn) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: routeProps.location },
              }}
              {...routeProps}
            />
          );
        } else {
          const { user } = props;
          if (!routeProps.location.pathname.includes(user.type)) {
            return <AccessRestriction user={user} />;
          }
          return <RouteComponent {...routeProps} />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.data?.isSignedIn,
    user: state.auth.data?.user,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
