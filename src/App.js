import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import Modal from "./components/Modal";
import "./index.css";
import useProducts from "./hooks/useProducts";
import useCart from "./hooks/useCart";
import Banner from "./components/Banner";

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showDeals, setShowDeals] = useState(true);

  const {
    query,
    handleInputChange,
    handleChange,
    handleClick,
    filteredData,
    setSelectedCategory,
    selectedCategory,
  } = useProducts();

  const { cartItems, addToCart, setCartItems, removeFromCart, clearCart } =
    useCart();

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const toggleCartDrawer = () => {
    setShowCartDrawer(!showCartDrawer);
  };

  const handleCardClick = (product) => {
    console.log(product);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const result = filteredData.map((product) => (
    <Card
      key={product.id}
      {...product}
      addToCart={addToCart}
      onClick={() => handleCardClick(product)}
    />
  ));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation
        query={query}
        handleInputChange={handleInputChange}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        addToCart={addToCart}
        showCartDrawer={showCartDrawer}
        handleDrawerToggle={handleDrawerToggle}
        toggleCartDrawer={toggleCartDrawer}
        showDeals={showDeals}
        setShowDeals={setShowDeals}
      />

      <Sidebar
        handleChange={handleChange}
        setIsClosing={setIsClosing}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {showDeals && <Banner />}
        {/* <Recommended handleClick={handleClick} /> */}
        <Products result={result} />
      </Box>

      <Modal
        show={selectedProduct !== null}
        onClose={handleCloseModal}
        product={selectedProduct}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        toggleCartDrawer={toggleCartDrawer}
      />
    </Box>
  );
}

export default App;
