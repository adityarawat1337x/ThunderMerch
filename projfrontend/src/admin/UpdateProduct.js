import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../auth/helper";
import Base from "../core/Base";
import {
  getAProduct,
  getAllCategories,
  updateProduct,
} from "./helper/AdminApiCall";

function UpdateProduct({ match }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createProduct: {},
    getRedirect: false,
    formData: "",
  });

  useEffect(() => {
    preLoad(match.params.productId);
  }, []);

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preLoad = (productId) => {
    getAProduct(productId)
      .then((data) => {
        console.log(data);
        if (data.Error) {
          console.log(data);
          setValues({ ...values, error: data });
        } else {
          getAllCategories()
            .then((cate) => {
              if (cate.Error) {
                setValues({ ...values, error: cate });
              } else {
                setValues({
                  ...values,
                  name: data.name,
                  description: data.description,
                  price: data.price,
                  stock: data.stock,
                  size: data.size,
                  categories: cate,
                  formData: new FormData(),
                });
              }
            })
            .catch();
        }
      })
      .catch();
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const { user, token } = checkToken();
    setValues({ ...values, error: "", loading: true });

    updateProduct(user._id, token, formData, match.params.productId)
      .then((data) => {
        if (data.Error) {
          setValues({ ...values, error: data.Error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            size: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch();
  };

  const successMessage = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully!</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  const createProductForm = () => (
    <form>
      <div className="form-group my-3 text-white">
        <span className="badge border border-info border-2 text-info rounded py-2 mr-2">
          Add Image
        </span>
        <input
          className="btn btn-dark mx-2 col-5"
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          placeholder="Add Image"
        />
      </div>
      <div className="form-group col-md-3 my-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control bg-dark border border-2 border-secondary text-info"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control bg-dark border border-2 border-secondary text-info"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="row">
        <div className="form-group col-md-2 my-2">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control bg-dark border border-2 border-secondary text-info"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group col-md-2 my-2">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control bg-dark border border-2 border-secondary text-info"
            placeholder="Stock"
            value={stock}
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-3 my-3">
          <select
            onChange={handleChange("category")}
            className="form-control bg-dark text-secondary border border-2 border-secondary"
            placeholder="Category"
          >
            <option>Category</option>
            {categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-3 my-3">
          <select
            onChange={handleChange("size")}
            className="form-control bg-dark text-secondary border border-2 border-secondary"
            placeholder="Size"
          >
            <option>Size</option>
            <option>M</option>
            <option>L</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-info rounded my-2"
      >
        Update
      </button>
    </form>
  );

  return (
    <Base
      title="Update product"
      description=""
      className="container rounded mt-5 p-4 bg-dark border border-3 border-secondary"
    >
      <Link
        className="btn btn-outline-info rounded border-2"
        to="/admin/dashboard"
      >
        Back
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default UpdateProduct;
