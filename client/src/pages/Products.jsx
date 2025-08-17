// File: src/pages/Products.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { fetchProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';

const categories = [
  'All',
  'Outdoor', 
  'Pure Indoor', 
  'Semi Indoor', 
  'Seeds', 
  'Soil & Fertilizers', 
  'Gardening accessories'
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const selectedCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // If the category is 'All', don't pass any category to the API call
        const categoryToFetch = selectedCategory === 'All' ? null : selectedCategory;
        const data = await fetchProducts(categoryToFetch);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategory]); // Re-fetch products whenever the selected category changes

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    if (newCategory === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?category=${newCategory}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Our Plant Collection
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      
      {!loading && !error && (
        <Grid container spacing={4}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
              No products found in this category.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
}
