import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
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
          return <RouteComponent {...routeProps} />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.data?.isSignedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
