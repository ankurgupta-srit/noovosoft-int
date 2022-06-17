import React, { useContext, useEffect, useState } from "react";
import { Cart } from "./Context";
import SingleProd from "./SingleProd";
const axios = require("axios").default;
// import defaultImage require('./img/defaultImage.jpg')

const ProductList = () => {
  const [products, setproducts] = useState([]);
  const [filterdProdList, setFilterdProdList] = useState([])
  const [categories, setCategories] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const {cart, setCart} =  useContext(Cart);

  useEffect(() => {
      axios.get(`https://dummyjson.com/products/categories`)
        .then(res => {
            const productList = res.data;
            setCategories(productList)
        })
       
      }, []); 

  useEffect(() => {
    axios.get(`https://dummyjson.com/products`).then((res) => {
      const productList = res.data.products;
      setproducts(productList);
      setFilterdProdList(productList)
    });
  }, []);

let selectCat = (e) => {
    setSelectedCategory(e.target.value)
    filterProd(e.target.value);
}
let filterProd = (categ) =>{
    let filteredProducts =  products.filter((p) => {
        if(categ === 'Select Category') return true
        return categ === p.category
    })
    setFilterdProdList(filteredProducts)
}
  return (
    <>
      <div className="grid grid-cols-6 border-2 bg-slate-500 text-white">
        <div className="col-span-3 py-4 pl-4">
          <input
            placeholder="Search"
            className="w-full rounded-xl py-1"
          ></input>
        </div>
        <div className="text-gray-800">
          <select
            className="mt-4 rounded-lg py-1"
            name="category"
            value={selectedCategory}
            onChange={selectCat}
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
            name="category"
            disabled
          >
            <option className="text-black">{cart.length}</option>
          </select>
        </div>
      </div>
      <div className=" px-40 bg-gray-200">
        {filterdProdList.length ?
          filterdProdList.map(
            (product) =>
              product.images[4] && (
                <SingleProd product={product} key={product.id}></SingleProd>
              )
          ):
          (
            <div className="mt-24">
                <span className="mt-20 font-bold text-xl text-red-800">Sorry No items Found....</span>
            </div>
          )}
      </div>
    </>
  );
};

export default ProductList;
