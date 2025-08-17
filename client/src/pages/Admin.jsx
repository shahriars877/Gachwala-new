// File: src/pages/Admin.jsx (Final Corrected Version)

import { Container, Typography, Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom'; // <-- 1. Import Outlet
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user } = useAuth();

  // This part is correct
  if (!user?.isAdmin) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          Access Denied - Admin privileges required
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* This navigation part is correct */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
        <Button variant="contained" component={Link} to="/admin/products">
          Manage Products
        </Button>
        <Button variant="contained" component={Link} to="/admin/orders">
          View Orders
        </Button>
        <Button variant="contained" component={Link} to="/admin/users">
          User Management
        </Button>
      </Box>

      {/* 2. Add the Outlet component here. The content will now appear below the buttons. */}
      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>

    </Container>
  );
}