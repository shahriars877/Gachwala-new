// File: src/components/ProductCard.jsx (Updated Version)

import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- 1. IMPORT useCart

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // <-- 2. GET THE addToCart FUNCTION

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
          BDT-{product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/products/${product._id}`}>
          View Details
        </Button>
        {/* 3. ADD THE onClick HANDLER */}
        <Button 
          size="small" 
          variant="contained"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}