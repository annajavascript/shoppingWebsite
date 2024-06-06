import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import "./Discounts.css";


const discounts = [
  { value: 0, label: 'All' },
  { value: 10, label: 'Up to 10% off' },
  { value: 20, label: '10% - 20% off' },
  { value: 30, label: '20% - 30% off' },
  { value: 40, label: '30% - 40% off' },
  { value: 50, label: '40% - 50% off' },
  { value: 60, label: '50% - 60% off' },
  { value: 70, label: '60% - 70% off' },
  { value: 80, label: '70% - 80% off' },
  { value: 90, label: '80% - 90% off' },
  { value: 100, label: '90% off and above' },
];

const Discounts = ({ handleChange }) => {
  return (
    <Box m={2} my={4}>
      <h2 className="sidebar-title">Discounts</h2>
      <FormControl fullWidth size='small'>
        <Select
          labelId="discounts-label"
          id="discounts"
          onChange={handleChange}
       
          displayEmpty
          defaultValue={0} // Set default value to 0
        >
          {discounts.map((discount) => (
            <MenuItem key={discount.value} value={discount.value}>
              {discount.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Discounts;
