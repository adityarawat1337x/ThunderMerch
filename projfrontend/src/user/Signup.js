import React, { useState } from "react";
import Base from "../core/Base";
import Link from "react-router-dom";

function Signup() {
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form className="form-group">
            <label className="text-light my-2">Name</label>
            <input className="form-control" type="text" />
            <label className="text-light my-2">Email</label>
            <input className="form-control" type="text" />
            <label className="text-light my-2">Password</label>
            <input className="form-control" type="text" />
          </form>
          <button className="btn btn-info btn-block my-4">Submit</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Base title="Sign Up" description="">
        {signUpForm()}
      </Base>
    </div>
  );
}

export default Signup;
