import { useState } from "react";
import data from "../db/data";

const useProducts = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    filterData(event.target.value, selectedCategory);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    filterData(query, event.target.value);
  };

  const handleClick = () => {
    filterData(query, selectedCategory);
  };

  const filterData = (query, filterOption) => {
    console.log(query);
    console.log(filterOption);
    let filtered = data.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) &&
        (filterOption === "" ||
          filterOption === 0 ||
          product.category === filterOption ||
          product.color === filterOption ||
          product.discount === filterOption ||
          product.priceRange === filterOption)
    );
    console.log(filtered);
    setFilteredData(filtered);
  };

  return {
    query,
    handleInputChange,
    handleChange,
    handleClick,
    filteredData,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useProducts;
