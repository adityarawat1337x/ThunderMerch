import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AddCategory from "./admin/AddCategory";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminDashboard from "./user/AdminDashboard";
import UserDashboard from "./user/UserDashboard";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
