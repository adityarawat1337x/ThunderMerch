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
      <div className="card border border-0">
        <h4 className="card-header bg-dark text-white text-center  border border-dark border-2">
          Admin Navigation
        </h4>
        <ul className="list-group bg-dark ">
          <li className="list-group-item  border border-dark border-2 bg-dark">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create Catgories
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark border-1">
            <Link to="/admin/create/product" className="nav-link text-info ">
              Create Products
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark border-1">
            <Link to="/admin/orders" className="nav-link text-info ">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark border-1">
            <Link to="/admin/products" className="nav-link text-info ">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item bg-dark  border border-dark border-1">
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
      <div className="card border-0 mb-4">
        <h4 className="card-header bg-dark text-white">Admin Information</h4>
        <ul className="list-group ">
          <li className="list-group-item bg-dark text-white  ">
            <span className=" mr-2">Name:</span> <span>{firstname}</span>
          </li>
          <li className="list-group-item bg-dark text-white">
            <span className=" mr-2">Email:</span> <span>{email}</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title={`Hello! ${firstname}`}
      description="Manage everything from here"
      className="container bg-dark border border-3 border-secondary p-4 rounded"
    >
      <div className="row  ">
        <div className="col-3 "> {leftPanel()}</div>
        <div className="col-9 "> {rightPanel()}</div>
      </div>
    </Base>
  );
}

export default AdminDashboard;
