import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGroducts from "../product/useGroducts";
import ChangeCategory from "../OnchangeCategory/ChangeCategory";
import { useState } from "react";
import VideoDetail from "../components/VideoDetail";

const Filter = () => {
  const { getCategories } = useGroducts();
  const [category, setCategory] = useState("");
  const { categories, state } = useSelector((state) => state.categories);

  useEffect(() => {
    getCategories({});
  }, []);

  console.log("hello", { state });

  return (
    <>
      <select
        style={{
          marginLeft: "300px",
          padding: "10px 20px",
          background: "#bd1cbd",
          color: "white",
          borderRadius: "10px",
          outline: "none",
        }}
        id="search"
        name="categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option value={category.name}>{category.name}</option>
        ))}
      </select>
    </>
  );
};

export default Filter;
