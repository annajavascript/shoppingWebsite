import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import "./Price.css";
import data from '../../db/data';

const Price = ({ handleChange }) => {
  const [priceRanges, setPriceRanges] = useState([]);

  useEffect(() => {
    // Extract unique categories from data
    const uniquePriceRanges = [...new Set(data.map(item => item.priceRange))]
      .map(priceRange => ({ value: priceRange, label: priceRange }));
      uniquePriceRanges.push( { value: '', label: 'All' })
    setPriceRanges(uniquePriceRanges);
  }, []);
  
  // const priceRanges = [
  //   { value: '', label: 'All' },
  //   { value: '10-50', label: '$10 - $50' },
  //   { value: '50-100', label: '$50 - $100' },
  //   { value: '100-500', label: '$100 - $500' },
  //   { value: '500-1000', label: 'Over $500' }
  // ];

  return (
    <Box m={2} my={4}>
      <h2 className="sidebar-title">Price</h2>
      <FormControl fullWidth size='small'>
        <Select
          onChange={handleChange}
          defaultValue=""
       
          name="priceRange"
          displayEmpty
          
        >
          {priceRanges.map((range) => (
            <MenuItem key={range.value} value={range.value}>
              {range.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Price;
