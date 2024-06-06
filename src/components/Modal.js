import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton, Grid, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAdd, MdRemove } from 'react-icons/md'; // Import MdRemove for decrementing
import './Modal.css';
import StarRating from './StarRating';

const Modal = ({ show, onClose, product, addToCart, cartItems, toggleCartDrawer, removeFromCart }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!show) return null;
  const { images, title, rating, prevPrice, price, description, category, id } = product;

  // Find the cart item corresponding to this product in the cart
  const cartItem = cartItems?.find(item => item.id === id);
  // Quantity for this product in the cart
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = () => {
    addToCart(product, 1); // Add one quantity of this product to the cart
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      removeFromCart(id, 1);
    }
    else
    removeFromCart(id,0);
  };

  const handleAddToCart = () => {
    addToCart(product, 1); // Add one quantity of this product to the cart
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <Dialog open={show} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
       {category}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                component="img"
                sx={{ maxHeight: 350, maxWidth: '100%', marginBottom: 2 }}
                src={images[selectedImageIndex]}
                alt={title}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
                {images.map((img, index) => (
                  <Box
                    key={index}
                    component="img"
                    sx={{ width: 50, height: 50, cursor: 'pointer', border: index === selectedImageIndex ? '2px solid #1976d2' : 'none' }}
                    src={img}
                    alt={`${title} ${index + 1}`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <h2>{title}</h2>
            <section className="modal-reviews">
              <StarRating rating={rating}/>
            </section>
            <section className="modal-price">
              <div className="price">
                <del>{prevPrice}</del> ${price}
              </div>
            </section>
            <p>{description}</p>
          <div style={{marginTop:'30px'}}>
              {quantity === 0 ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AiOutlineShoppingCart />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            ) : (
              <Box display="flex" alignItems="center" mb={2}>
                <IconButton aria-label="decrement" onClick={handleDecrement}>
                  <MdRemove />
                </IconButton>
                <Typography variant="body1">{quantity}</Typography>
                <IconButton aria-label="increment" onClick={handleIncrement}>
                  <MdAdd />
                </IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onClose();
                    toggleCartDrawer();
                  }}
                >
                  Go to Cart
                </Button>
              </Box>
            )}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
