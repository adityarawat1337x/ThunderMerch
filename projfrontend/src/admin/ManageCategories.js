import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../auth/helper";
import Base from "../core/Base";
import {
  deleteCategory,
  deleteProduct,
  getAllCategories,
  getAllProducts,
} from "./helper/AdminApiCall";

function ManageCategories() {
  const [category, setCategory] = useState([]);
  const { user, token } = checkToken();

  const preload = () => {
    getAllCategories()
      .then((data) => {
        console.log(data);
        if (data.Error) {
          console.log(data.Error);
        } else {
          setCategory(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const removeCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.Error) {
          console.log(data.Error);
        } else {
          preload();
        }
      })
      .catch();
  };

  return (
    <Base title="Welcome admin" description="Manage Categories here">
      <Link className="btn btn-outline-info" to={`/admin/dashboard`}>
        <span className="">Back</span>
      </Link>
      <div className="container">
        <div className="col-12">
          {category.map((cate, index) => {
            return (
              <div key={index} className="row mb-2 mr-3">
                <div className="col-6">
                  <h4 className="text-info text-left">{cate.name}</h4>
                </div>
                <div className="col-3">
                  <Link
                    className="btn btn-info"
                    to={`/admin/category/update/${cate._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-3">
                  <button
                    onClick={() => {
                      removeCategory(cate._id);
                    }}
                    className="btn btn-warning"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default ManageCategories;
