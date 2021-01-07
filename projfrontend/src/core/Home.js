import React from "react";
import "../styles.css";
import Base from "./Base";

function Home() {
  const t = (
    <>
      <span className="text-warning"> Thunder </span>
      <span className="text-info">Merch</span>
    </>
  );

  return (
    <Base title={t} description="Pick your poison!">
      <h1 className="text-white"></h1>
    </Base>
  );
}

export default Home;
