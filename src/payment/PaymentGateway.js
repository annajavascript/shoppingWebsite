import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';

const PaymentGateway = ({ open, onClose, onPaymentSuccess }) => {
  const [cardType, setCardType] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [showCVV, setShowCVV] = useState(false);

  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    let formattedInput = '';
    for (let i = 0; i < input.length; i++) {
      if (i % 4 === 0 && i > 0) formattedInput += '-';
      formattedInput += input.charAt(i);
    }
    setCardNumber(formattedInput.slice(0, 19)); // Limit length to 19 characters (16 digits + 3 hyphens)
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleCVVVisibilityToggle = () => {
    setShowCVV(!showCVV);
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handlePayment = () => {
        if (cardType === '' || cardNumber === '' || expiryDate === '' || cvv === '') {
          // Display an error message or prevent proceeding
          alert('Please fill in all fields before proceeding.');
          return;
        }
  else{      
    onClose();
    onPaymentSuccess();
  }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Select Card Type"
          value={cardType}
          onChange={handleCardTypeChange}
          fullWidth
          variant="outlined"
          margin="normal"
        >
          <MenuItem value="credit">Credit Card</MenuItem>
          <MenuItem value="debit">Debit Card</MenuItem>
        </TextField>

        <TextField
          label="Cardholder name"
          placeholder="name"
          value={cardHolder}
          onChange={handleCardHolderChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Card Number"
          value={cardNumber}
          placeholder='xxxx-xxxx-xxxx-xxxx'
          onChange={handleCardNumberChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Expiry Date"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="CVV"
          value={cvv}
          onChange={handleCVVChange}
          fullWidth
          variant="outlined"
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCVVVisibilityToggle} edge="end">
                  {showCVV ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showCVV ? 'text' : 'password'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePayment} color="primary" variant="contained">
          Pay Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentGateway;
