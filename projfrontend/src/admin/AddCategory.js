import React, { useState } from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/AdminApiCall";

function AddCategory() {
  const [category, setCategory] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  const { user, token } = checkToken();

  const submitHandler = (event) => {
    event.preventDefault();
    seterror("");
    setsuccess("");
    createCategory(user._id, token, { name: category })
      .then((data) => {
        if (data.Error) {
          seterror(true);
          setsuccess(false);
        } else {
          setsuccess(true);
          seterror(false);
          setCategory("");
        }
      })
      .catch();
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create category</h4>;
    }
  };

  const categoryForm = () => (
    <>
      <form>
        <div className="form-group">
          <h3 className="text-white ">Category </h3>
          <input
            type="text"
            className="form-control py-2 my-4"
            placeholder="For ex. Summer"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            autoFocus
            required
          />
          <button
            className="mt-2 btn btn-info text-dark border-0 rounded"
            onClick={submitHandler}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );

  return (
    <Base
      title="Create a new Category here"
      description=""
      className="container rounded col-md-4 mt-5 p-4 bg-dark border border-3 border-secondary"
    >
      <Link
        className="btn btn-outline-info rounded border-2"
        to="/admin/dashboard"
      >
        Back
      </Link>
      <div className="row rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
}
export default AddCategory;
