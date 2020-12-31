import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";

function Menu(history) {
  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { backgroundColor: "#20c8f7 ", color: "#000" };
    }
    return { color: "#d1d1d1" };
  };
  return (
    <div>
      <ul className="nav bg-dark nav-tabs justify-content-end border-0 mt-3 mx-3 hover">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            <span className="hover">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            <span className="hover">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            <span className="hover">Cart</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin"
          >
            <span className="hover">Admin</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signin")}
            className="nav-link"
            to="/signin"
          >
            <span className="hover">Sign in</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signout")}
            className="nav-link"
            to="/signout"
          >
            <span className="hover">Sign out</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currentTab(history, "/signup")}
            className="nav-link"
            to="/signup"
          >
            <span className="hover">Sign up</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Menu);
