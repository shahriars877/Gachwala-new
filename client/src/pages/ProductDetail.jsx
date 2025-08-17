import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { fetchProductById } from '../utils/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams(); // Gets the product ID from the URL
  const { addToCart } = useCart(); // Gets the addToCart function from our context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]); // Re-run this logic if the ID in the URL changes

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
  }

  if (!product) {
    return <Typography sx={{ m: 4 }}>Product not found.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3,
            }}
            src={product.image}
            alt={product.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ my: 2, fontWeight: 'bold' }}>
            BDT-{product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
            <Button
              component={Link}
              to="/products"
              variant="outlined"
              size="large"
              sx={{ ml: 2 }}
            >
              Back to Products
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}