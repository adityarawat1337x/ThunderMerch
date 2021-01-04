import React from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../auth/helper";
import Base from "../core/Base";

function AdminDashboard() {
  const {
    user: { firstname, email },
  } = checkToken();

  const leftPanel = () => {
    return (
      <div className="card border border-0 bg-dark">
        <h4 className="card-header bg-dark text-white border border-dark rounded-0">
          Navigation
        </h4>
        <ul className="list-group bg-dark">
          <li className="list-group-item  border border-dark rounded-0 bg-dark">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create Catgories
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark ">
            <Link to="/admin/create/product" className="nav-link text-info ">
              Create Products
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark">
            <Link to="/admin/categories" className="nav-link text-info ">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark">
            <Link to="/admin/products" className="nav-link text-info ">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark">
            <Link to="/admin/orders" className="nav-link text-info ">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const rightPanel = () => {
    return (
      <div className="card bg-dark border border-0 ">
        <h4 className="card-header bg-dark text-white border border-dark rounded-0 ">
          Profile
        </h4>
        <ul className="list-group ">
          <li className="list-group-item bg-dark text-info border border-dark rounded-0 ">
            <span className=" rounded px-2 mx-2 text-secondary border border-secondary border-2">
              Name
            </span>
            <span className="bg-info rounded px-2 mx-2 text-dark">
              {firstname}
            </span>
          </li>
          <li className="list-group-item bg-dark  text-info border border-dark rounded-0 ">
            <span className="rounded px-2 mx-2 text-secondary border border-secondary border-2">
              Email
            </span>
            <span className="bg-info rounded px-2 mx-2 text-dark">{email}</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin panel"
      description="Manage app"
      className="container bg-dark border border-3 border-secondary py-4 mt-5"
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-6 "> {leftPanel()}</div>
          <div className="col-sm-6 "> {rightPanel()}</div>
        </div>
      </div>
    </Base>
  );
}

export default AdminDashboard;
