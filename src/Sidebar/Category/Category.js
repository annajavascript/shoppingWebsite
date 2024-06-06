import { useState, useEffect } from 'react';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import "./Category.css";
import data from '../../db/data';

function Category({ handleChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from data
    const uniqueCategories = [...new Set(data.map(item => item.category))]
      .map(category => ({ value: category, label: category }));
      uniqueCategories.push({ value: '', label: 'All' })
    setCategories(uniqueCategories);
  }, []);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    handleChange(event); // Call the handleChange function with the selected value
  };

  return (
    <Box m={2} my={4}>
      <h2 className="sidebar-title">Category</h2>
 
      <FormControl fullWidth size='small'>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        displayEmpty
      >
        {categories.map((category) => (
          <MenuItem key={category.value} value={category.value}>
            {category.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  );
}

export default Category;
