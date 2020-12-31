import React from "react";
import { Route, Redirect } from "react-router-dom";
import { checkToken } from "./index";

function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkToken() && checkToken().user.role === 1 ? (
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

export default AdminRoute;
