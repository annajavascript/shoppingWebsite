import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import { Button, IconButton, Grid, Box, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { MdRemove, MdAdd } from 'react-icons/md';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import PaymentGateway from '../payment/PaymentGateway';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const CartDrawer = ({ open, onClose, cartItems, clearCart, removeFromCart, addToCart }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(3);

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setOrderPlaced(true);
    setShowPayment(false);
    onClose(); // Close the cart drawer after successful payment
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId, 1);
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div style={{ width: 300 }}>
          <List style={{ maxHeight: '650px', overflow: 'auto' }}>
            <ListItem>
              <ListItemText primary="Shopping Cart" />
            </ListItem>
            <Divider />
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                 <BootstrapTooltip title={item.title}>
                <ListItemText
                  primary={
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {item.title}
                    </div>
                  }
                  secondary={<div style={{fontSize: '14px', fontWeight :500 }}>
                 {`$${item.price.toFixed(2)} x ${item.quantity}`}
                </div>
                  }
                />
             </BootstrapTooltip>

                <Box display="flex" alignItems="center" mb={2}>
                  <IconButton aria-label="decrement" onClick={() => removeFromCart(item.id, 1)}>
                    <MdRemove />
                  </IconButton>
                  <Typography variant="body1">{item.quantity}</Typography>
                  <IconButton aria-label="increment" onClick={() => removeFromCart(item.id, -1)}>
                    <MdAdd />
                  </IconButton>
                </Box>

              </ListItem>
            ))}
            <Divider />
            <ListItem>
              {cartItems.length !== 0 ? (
                <ListItemText primary={`Total: $${totalAmount}`} />
              ) : (
                <ListItemText primary={`No products added to cart`} />
              )}
            </ListItem>
          </List>
          {cartItems.length !== 0 && (
            <Button variant="contained" color="primary" fullWidth onClick={handleProceedToPayment}>
              Proceed to Payment
            </Button>
          )}
          <Button variant="contained" color="secondary" fullWidth onClick={clearCart} style={{ marginTop: '10px' }}>
            Clear Cart
          </Button>
        </div>
      </Drawer>
      <PaymentGateway
        open={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
      {orderPlaced && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={orderPlaced}
          autoHideDuration={6000}
          onClose={() => setOrderPlaced(false)}
        >
          <Alert onClose={() => setOrderPlaced(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
            Order placed successfully!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CartDrawer;
