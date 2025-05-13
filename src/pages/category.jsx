import React from "react";
import Nav from "../components/Nav";
import Catagories from "../components/catagories";
// import data from "../../dummy.json";

const Category = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  return (
    <section>
      <Catagories />
    </section>
  );
};

export default Category;
