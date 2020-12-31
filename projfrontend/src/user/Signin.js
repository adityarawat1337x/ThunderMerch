import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, saveToken, checkToken } from "../auth/helper/index";

function Signin() {
  // state
  const [userData, setuserData] = useState({
    email: "asdw@asdw.asdw",
    password: "asdwasdw",
    error: "",
    loading: false,
    didRedirect: false,
  });

  // destructuring
  const { email, password, error, loading, didRedirect } = userData;

  // form handling
  const changeHandler = (fieldname) => (event) => {
    setuserData({ ...userData, error: "", [fieldname]: event.target.value });
  };

  // redirecting
  const performRedirect = () => {
    const user = checkToken();
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (checkToken()) {
      console.log(user);
      return <Redirect to="/" />;
    }
  };

  // loading message
  const loadingMessage = () => {
    if (loading)
      return (
        <div className="col-md-4 offset-sm-4 text-left">
          <div
            className="alert alert-info"
            style={{ display: loading ? "" : "none" }}
          >
            Loggin in...
          </div>
        </div>
      );
    else return;
  };

  // error message
  const errorMessage = () => {
    // console.log(error);

    return (
      <div className="col-md-4 offset-sm-4 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {Object.entries(error).map((err, index) => {
            return <div>{`${index + 1}. ${err[1].Err}`}</div>;
          })}
        </div>
      </div>
    );
  };

  // submit handler
  const onSubmit = (e) => {
    e.preventDefault();
    setuserData({ ...userData, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.Errors) {
          setuserData({
            email: "",
            password: "",
            error: data.Errors,
            loading: false,
            didRedirect: false,
          });
        } else {
          saveToken(data, () => {
            setuserData({
              email: "",
              password: "",
              error: "",
              didRedirect: true,
              loading: false,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // sign in form
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form className="form-group">
            <label className="text-light my-2">Email</label>
            <input
              className="form-control"
              type="text"
              onChange={changeHandler("email")}
              placeholder="name"
              value={email}
            />
            <label className="text-light my-2">Password</label>
            <input
              className="form-control"
              type="text"
              onChange={changeHandler("password")}
              placeholder="name"
              value={password}
            />
          </form>
          <button className="btn btn-info btn-block my-4" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base title="Sign In" description="">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </Base>
    </div>
  );
}

export default Signin;
