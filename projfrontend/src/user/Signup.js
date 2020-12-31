import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

function Signup() {
  const [userData, setuserData] = useState({
    firstname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { firstname, email, password, success, error } = userData;

  const changeHandler = (fieldname) => (event) => {
    setuserData({ ...userData, error: "", [fieldname]: event.target.value });
  };

  const successMessage = () => {
    return (
      <div className="col-md-4 offset-sm-4 text-left">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          New account created. Please <Link to="/signin">login here</Link>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    setuserData({ ...userData, error: false });
    signup({ firstname, email, password })
      .then((data) => {
        if (data.Errors) {
          setuserData({
            firstname: "",
            email: "",
            password: "",
            error: data.Errors,
            success: false,
          });
        } else {
          setuserData({
            firstname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form className="form-group">
            <label className="text-light my-2">Name</label>
            <input
              className="form-control"
              type="text"
              onChange={changeHandler("firstname")}
              placeholder="name"
              value={firstname}
            />

            <label className="text-light my-2">Email</label>
            <input
              className="form-control"
              type="text"
              value={email}
              onChange={changeHandler("email")}
              placeholder="email"
            />
            <label className="text-light my-2">Password</label>
            <input
              className="form-control"
              type="text"
              value={password}
              placeholder="password"
              onChange={changeHandler("password")}
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
      <Base title="Sign Up" description="">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-white text-center">{`Hi I'm ${firstname}. My email is ${email} and password is ${password}`}</p>
      </Base>
    </div>
  );
}

export default Signup;
