import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Calculate totals
  const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
//   const taxPrice = itemsPrice * 0.05; // Example 5% tax
  const shippingPrice = itemsPrice > 1000 ? 0 : 50; // Example free shipping over $1000
  const totalPrice = itemsPrice + shippingPrice;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">Your cart is empty.</Typography>
          <Button component={Link} to="/products" variant="contained" sx={{ mt: 2 }}>
            Go Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              {cartItems.map((item) => (
                <Box key={item._id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <img src={item.image} alt={item.name} width="100%" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle1" component={Link} to={`/products/${item._id}`}>
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => removeFromCart(item)} size="small">
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton onClick={() => addToCart(item)} size="small">
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                      <Typography>
                        BDT-{(item.quantity * item.price).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* --- Order Summary --- */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Items</Typography>
                <Typography>BDT-{itemsPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>BDT-{shippingPrice.toFixed(2)}</Typography>
              </Box>
              {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tax</Typography>
                <Typography>BDT-{taxPrice.toFixed(2)}</Typography>
              </Box> */}
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">BDT-{totalPrice.toFixed(2)}</Typography>
              </Box>
              <Button 
                component={Link} 
                to="/checkout" 
                variant="contained" 
                color="primary" 
                fullWidth
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}