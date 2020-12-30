import React from "react";
import { Link, withRouter } from "react-router-dom";

function Menu(history) {
  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { backgroundColor: "#20c8f7 ", color: "#000" };
    }
    return { color: "#d1d1d1" };
  };
  return (
    <div>
      <ul className="nav bg-dark nav-tabs justify-content-end border-0 mt-3 mx-3">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin"
          >
            Admin
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signin")}
            className="nav-link"
            to="/signin"
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signout")}
            className="nav-link"
            to="/signout"
          >
            Sign Out
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signup")}
            className="nav-link"
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Menu);
