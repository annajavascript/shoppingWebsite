import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import useProducts from "./hooks/useProducts";
import useCart from "./hooks/useCart";
import Banner from "./components/Banner";
// Mock the hooks
jest.mock("./hooks/useProducts");
jest.mock("./hooks/useCart");

describe("App Component", () => {
  const mockProductDetails = {
    id: 1,
    title: "adidas Unisex Prime 6 Backpack, Black, One Size",
    price: 70,
    discount: 50,
    prevPrice: "$140",
    priceRange: "$50-$100",
    description:
      "Your perfect backpack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "Luggage & travel gear",
    images: ["https://m.media-amazon.com/images/I/81-0VPXwnnL._AC_SX679_.jpg"],
    img: "https://m.media-amazon.com/images/I/81-0VPXwnnL._AC_SX679_.jpg",
    rating: {
      rate: 4.2,
      count: 1120,
    },
    company: "Adidas",
    color: "black",
  };
  const mockCartdata = {
    id: 1,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 950,
    quantity: 2,
  };

  beforeEach(() => {
    useProducts.mockReturnValue({
      query: "",
      handleInputChange: jest.fn(),
      handleChange: jest.fn(),
      handleClick: jest.fn(),
      filteredData: [mockProductDetails],
      setSelectedCategory: jest.fn(),
      selectedCategory: "",
    });

    useCart.mockReturnValue({
      cartItems: [],
      addToCart: jest.fn(),
      setCartItems: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    });
  });

  test("renders navigation bar static text", () => {
    render(<App />);

    screen.getByText("YCompany");
    screen.getByPlaceholderText(/search/i);
  });

  test("shows the deals banner", () => {
    render(<App />);
    screen.getByLabelText(/show deals/i);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  test("render product details", () => {
    render(<App />);
    screen.getByText(mockProductDetails.title);
    screen.getByText(mockProductDetails.prevPrice);
    const productImage = screen.getByAltText(mockProductDetails.title);
    expect(productImage).toHaveAttribute("src", mockProductDetails.img);

    const addToCartButton = screen.getByRole("button", { name: /Buy/i });
    fireEvent.click(addToCartButton);
    screen.getByRole("button", { name: /Add to Cart/i });
  });

  test("render product details", () => {
    render(<App />);
    screen.getByText(mockProductDetails.title);
    screen.getByText(mockProductDetails.prevPrice);
    const productImage = screen.getByAltText(mockProductDetails.title);
    expect(productImage).toHaveAttribute("src", mockProductDetails.img);

    const addToCartButton = screen.getByRole("button", { name: /Buy/i });
    fireEvent.click(addToCartButton);
    screen.getByRole("button", { name: /Add to Cart/i });
  });

  test("add to cart", () => {
    render(<App />);
    const addToCartButton = screen.getByRole("button", { name: /Buy/i });
    fireEvent.click(addToCartButton);
    screen.getByRole("button", { name: /Add to Cart/i });
  });

  test("handles card click to show product modal", () => {
    render(<App />);
    const productTitle = screen.getByText(mockProductDetails.title);
    fireEvent.click(productTitle);
    screen.getByRole("dialog");
    screen.getByText(mockProductDetails.category);
    screen.getAllByRole("button", { name: /Close/i });
  });

  test("cart should render cartdata items", () => {
    useCart.mockReturnValue({
      cartItems: [mockCartdata],
      addToCart: jest.fn(),
      setCartItems: jest.fn(),
      removeFromCart: jest.fn(),
      clearCart: jest.fn(),
    });
    render(<App />);

    const openCart = screen.getByTestId("shoppingcart");
    fireEvent.click(openCart);
    screen.getByText(mockCartdata.title);
    screen.getByText(mockCartdata.quantity);
    screen.getAllByText(mockProductDetails.title);
    screen.getByText(/Proceed to Payment/i);
    screen.getByRole("button", { name: /Clear Cart/i });
  });
});
