// File: src/pages/admin/AddProduct.jsx (Updated Version)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  MenuItem,
  FormControlLabel, // <-- 1. IMPORTED THIS
  Switch,           // <-- 2. IMPORTED THIS
  CircularProgress,
  Alert
} from '@mui/material';
import { addProduct } from '../../utils/api';

const categories = [
  'Outdoor', 
  'Pure Indoor', 
  'Semi Indoor', 
  'Seeds', 
  'Soil & Fertilizers', 
  'Gardening accessories'
];

export default function AddProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    isFeatured: false // <-- 3. ADDED isFeatured TO THE STATE
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 4. UPDATED handleChange TO WORK WITH THE SWITCH
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await addProduct(productData);
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add product. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add a New Product
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* ... Your other TextFields (name, category, price, etc.) are unchanged ... */}
            <TextField
              name="name"
              label="Product Name"
              value={productData.name}
              onChange={handleChange}
              required
            />
            <TextField
              name="category"
              label="Category"
              value={productData.category}
              onChange={handleChange}
              select
              required
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="price"
              label="Price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              required
            />
            <TextField
              name="image"
              label="Image URL"
              value={productData.image}
              onChange={handleChange}
              required
            />
            <TextField
              name="description"
              label="Description"
              value={productData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />

            {/* 5. ADDED THE SWITCH COMPONENT TO THE FORM */}
            <FormControlLabel
              control={
                <Switch
                  checked={productData.isFeatured}
                  onChange={handleChange}
                  name="isFeatured"
                  color="primary"
                />
              }
              label="Feature this product on the homepage"
            />
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Add Product'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}