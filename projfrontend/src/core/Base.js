import React from "react";
import Menu from "./Menu";
import "../styles.css";

function Base({
  title = "Title",
  description = "Description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <span className="title">{title}</span>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-2">
        <div className="container-fluid bg-secondary text-white text-center py-3">
          <div className="row">
            <h4 className="col-6">Feel free to contact us for any query.</h4>
            <span className="col-6">
              <button className="btn btn-info">Contact Us</button>
            </span>
          </div>
        </div>
        <div className="container">
          <span className="text-muted">
            Made in <span style={{ color: "#ff6e00" }}>In</span>
            <span className="text-white">d</span>
            <span style={{ color: "#0cff00" }}>ia</span> by
            <span className="text-info"> Adi</span>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Base;
