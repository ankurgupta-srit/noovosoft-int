import React, { useContext, useEffect, useState } from "react";
import { Cart } from "./Context";
const axios = require("axios").default;

const NavBar = () => {
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const { cart } = useContext(Cart);
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/categories`).then((res) => {
      const productList = res.data;
      setCategories(productList);
    });
  }, []);

  return (
    <div className="grid grid-cols-6 border-2 bg-slate-500 text-white">
      <div className="col-span-3 py-4 pl-4">
        <input placeholder="Search" className="w-full rounded-xl py-1"></input>
      </div>
      <div className="text-gray-800">
        <select
          className="mt-4 rounded-lg py-1"
          name="country"
          value={selectedCategory}
          onChange=""
        >
          <option>Select Category</option>
          {categories &&
            categories.map((e, key) => {
              return (
                <option key={key} value={e}>
                  {e}
                </option>
              );
            })}
        </select>
      </div>
      <div className="rounded-lg py-4 col-start-6">
        <span className="py-4">User Cart</span>
        <select
          className="ml-2 mt-3 rounded-lg py-1 text-black"
          name="country"
          disabled
        >
          <option className="text-black">{cart.length}</option>
        </select>
      </div>
    </div>
  );
};

export default NavBar;
