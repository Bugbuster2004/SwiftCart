// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function UseCategory() {
  const [categories, setCategories] = useState([]);
  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/category/get-category`
      );
      setCategories(data?.category);
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}

export default UseCategory;
