import React from "react";
import Menu from "./Menu";
import "../styles.css";

function Base({
  title = " My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h1 className="pt-5" style={{ color: "#20c8f7" }}>
            {title}
          </h1>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>

      <footer className="footer bg-dark mg-auto py-3">
        <div className="container-fluid bg-secondary text-white text-center py-3">
          <h4>Feel free to contact us.</h4>
          <button className="btn btn-info">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            Made with love by <span className="text-white">Adi</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Base;
