import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/AdminApiCall";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const { user, token } = checkToken();
  const preload = () => {
    getAllProducts()
      .then((data) => {
        console.log(data);
        if (data.Error) {
          console.log(data.Error);
        } else {
          setProducts(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const removeProduct = (productId) => {
    deleteProduct(productId, user._id, token)
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
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-outline-info" to={`/admin/dashboard`}>
        <span className="">Back</span>
      </Link>
      <div className="container">
        <div className="col-12">
          {products.map((product, index) => {
            return (
              <div key={index} className="row mb-2 mr-3">
                <div className="col-6">
                  <h4 className="text-info text-left">
                    {product.name}
                    <span className="badge text--secondary">
                      {" >"}
                      {product.category.name}
                    </span>
                  </h4>
                </div>
                <div className="col-3">
                  <Link
                    className="btn btn-info"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-3">
                  <button
                    onClick={() => {
                      removeProduct(product._id);
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

export default ManageProducts;
