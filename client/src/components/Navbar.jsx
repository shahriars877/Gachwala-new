// File: src/components/Navbar.jsx (Updated Version)

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // <-- 1. IMPORT useCart

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart(); // <-- 2. GET cartItems FROM THE CONTEXT
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 3. CALCULATE THE TOTAL NUMBER OF ITEMS IN THE CART
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Gachwala
        </Typography>

        {user ? (
          <>
            {user.isAdmin && (
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}

        {/* --- 4. UPDATE THE CART ICON --- */}
        <IconButton 
          color="inherit" 
          component={Link} 
          to="/cart"
          aria-label="show cart items"
        >
          <Badge badgeContent={totalCartItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}