// File: src/pages/admin/ManageProducts.jsx (Final Version)

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  CircularProgress, 
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../utils/api'; // We use the function we already have!

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // The empty array means this effect runs once when the component mounts

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Manage Products
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/admin/products/new"
        >
          Add New Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img src={product.image} alt={product.name} width="50" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>BDT-{product.price.toFixed(2)}</TableCell>
                {/* <TableCell>
                  <Button size="small" sx={{ mr: 1 }}>Edit</Button>
                  <Button size="small" color="error">Delete</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}