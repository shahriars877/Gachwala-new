import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Provide a default value. This is the key to the fix.
// It guarantees cartItems will always be an array.
const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage, or an empty array if nothing is there
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data from localStorage", error);
      return [];
    }
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((x) => x._id === product._id);
      if (exist) {
        return prevItems.map((x) =>
          x._id === product._id ? { ...exist, quantity: exist.quantity + 1 } : x
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((x) => x._id === product._id);
      if (exist.quantity === 1) {
        return prevItems.filter((x) => x._id !== product._id);
      } else {
        return prevItems.map((x) =>
          x._id === product._id ? { ...exist, quantity: exist.quantity - 1 } : x
        );
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};