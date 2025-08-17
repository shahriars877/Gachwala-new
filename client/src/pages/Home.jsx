// File: src/pages/Home.jsx (Complete and Redesigned Version)

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert, 
  Box, 
  Button,
  Paper,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard'; // <-- Import CategoryCard

// You should replace this with a high-quality image of your own
const heroBackgroundImage = 'https://i.ibb.co.com/ds683FVW/cover.png';

// Define your categories and assign images
const categories = [
  { name: 'Outdoor', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Pure Indoor', image: 'https://images.unsplash.com/photo-1592234857096-726d96a750a3?q=80&w=1964&auto=format&fit=crop' },
  { name: 'Semi Indoor', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e2b?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Seeds', image: 'https://images.unsplash.com/photo-1588578282224-74c172a15a42?q=80&w=1939&auto=format&fit=crop' },
  { name: 'Soil & Fertilizers', image: 'https://images.unsplash.com/photo-1588578282224-74c172a15a42?q=80&w=1939&auto=format&fit=crop' },
  { name: 'Gardening Accessories', image: 'https://images.unsplash.com/photo-1588578282224-74c172a15a42?q=80&w=1939&auto=format&fit=crop' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Data fetching logic is unchanged
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch featured products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  return (
    <Box>
      {/* --- 1. HERO SECTION --- */}
      <Paper 
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${heroBackgroundImage})`,
          py: 12,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0, left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="md">
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              textAlign: 'center',
            }}
          >
            <Typography component="h1" variant="h2" color="inherit" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome to Gachwala
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Your one-stop shop for the finest indoor and outdoor plants. Bring nature home today.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/products"
              sx={{ mt: 3 }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <Container maxWidth="lg" sx={{ py: 4 }}>

        {/* --- 2. SHOP BY CATEGORY SECTION --- */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center" component="h2">
            Shop by Category
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {categories.map((cat) => (
              <Grid item key={cat.name} xs={12} sm={6} md={3}>
                <CategoryCard category={cat.name} image={cat.image} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* --- 3. FEATURED PRODUCTS SECTION --- */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Featured Plants
          </Typography>
          
          {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
          {error && <Alert severity="error">{error}</Alert>}
          
          {!loading && !error && (
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid item key={product._id} xs={12} sm={6} md={4}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Typography sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                  No featured products found.
                </Typography>
              )}
            </Grid>
          )}
        </Box>

      </Container>
    </Box>
  );
}