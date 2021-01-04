import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../auth/helper";
import Base from "../core/Base";
import { getAllCategories, createAProduct } from "./helper/AdminApiCall";

function AddProduct() {
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
    preLoad();
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

  const preLoad = () => {
    getAllCategories()
      .then((data) => {
        if (data.Error) {
          setValues({ ...values, error: data });
        } else {
          setValues({
            ...values,
            categories: data,
            formData: new FormData(),
          });
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
    createAProduct(user._id, token, formData)
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
        Create
      </button>
    </form>
  );

  return (
    <Base
      title="Create new products"
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

export default AddProduct;
