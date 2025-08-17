// File: src/pages/Checkout.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Divider,
  Alert
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../utils/api';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '' 
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
//   const taxPrice = itemsPrice * 0.05;
  const shippingPrice = itemsPrice > 1000 ? 0 : 50;
  const totalPrice = itemsPrice + shippingPrice;

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // This data structure now PERFECTLY matches the backend Order model
    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingAddress,
      totalPrice,
    };

    try {
      await placeOrder(orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to place order. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{py: 4, textAlign: 'center'}}>
        <Typography variant="h5">Your cart is empty.</Typography>
        <Button variant="contained" component={Link} to="/products" sx={{mt: 2}}>
          Go Shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Shipping Address</Typography>
              <TextField name="address" label="Address" fullWidth required onChange={handleChange} sx={{ mb: 2 }} />
              <TextField name="city" label="City" fullWidth required onChange={handleChange} sx={{ mb: 2 }} />
              <TextField name="postalCode" label="Postal Code" fullWidth required onChange={handleChange} sx={{ mb: 2 }} />
              <TextField name="country" label="Country" fullWidth required onChange={handleChange} sx={{ mb: 2 }} />
              <TextField name="phone" label="Phone" fullWidth required onChange={handleChange} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Items Total</Typography>
                <Typography>BDT-{itemsPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>BDT-{shippingPrice.toFixed(2)}</Typography>
              </Box>
              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tax (5%)</Typography>
                <Typography>BDT-{taxPrice.toFixed(2)}</Typography>
              </Box> */}
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2, fontWeight: 'bold' }}>
                <Typography variant="h6">Order Total</Typography>
                <Typography variant="h6">BDT-{totalPrice.toFixed(2)}</Typography>
              </Box>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
