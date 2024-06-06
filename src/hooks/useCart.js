import { useState, useEffect } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Save cart items to localStorage whenever cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (product, quantity) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // If so, update the quantity of the existing item
      const updatedCartItems = cartItems.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      // If not, add the product to the cart with the selected quantity
      setCartItems([...cartItems, { id: product.id, title: product.title, price: product.price, quantity }]);
    }
  };

  const removeFromCart = (productId, quantityToRemove) => {
    // Find the cart item corresponding to the product ID
    const existingCartItem = cartItems.find(item => item.id === productId);
  
    if (!existingCartItem) {
      // If the item is not found, do nothing
      return;
    }
  
    // Calculate the new quantity after removing the specified quantity
    const newQuantity = existingCartItem.quantity - quantityToRemove;
  
    if (newQuantity <= 0) {
      // If the new quantity is zero or negative, remove the entire item from the cart
      const updatedCartItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCartItems);
    } else {
      // Otherwise, update the quantity of the existing item in the cart
      const updatedCartItems = cartItems.map(item => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: newQuantity
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
  };
  

  const clearCart = () => {
    // Clear all items from the cart
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart
  };
};

export default useCart;
