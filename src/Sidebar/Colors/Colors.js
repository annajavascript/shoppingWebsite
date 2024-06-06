import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import './Colors.css';
import data from '../../db/data';

const Colors = ({ handleChange }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Extract unique categories from data
    const uniqueColors = [...new Set(data.map(item => item.color))]
      .map(color => ({ value: color, label: color, color: color }));
      uniqueColors.push( { value: '', label: 'All', color: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' })
    setColors(uniqueColors);
  }, []);


  return (
    <Box m={2} my={4}>
      <h2 className="sidebar-title color-title">Colors</h2>
      <FormControl fullWidth size='small'>
        <Select
          onChange={handleChange}
          defaultValue=""
          name="color"
          displayEmpty
        >
          {colors.map((color) => (
            <MenuItem key={color.value} value={color.value}>
              <span
                className="color-circle"
                style={{
                  background: color.color,
                  display: 'inline-block', // Ensure the circle is displayed as a block element
                  width: '15px', // Adjust the width and height as needed
                  height: '15px',
                  borderRadius: '50%' ,
                  border: '1px solid black',
                  marginRight:'5px'// Make the circle shape
                }}
              ></span>
              {color.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Colors;
