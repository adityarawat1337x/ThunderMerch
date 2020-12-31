import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkToken } from "./index";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkToken() && checkToken().user.role === 0 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
