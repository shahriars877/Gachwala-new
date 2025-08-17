// File: src/pages/admin/ViewOrders.jsx (Final Version)

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
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
import { fetchOrders } from '../../utils/api'; // We use the function we already have!

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []); // The empty array means this effect runs once when the component mounts

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        View All Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.user ? order.user.name : 'N/A'} ({order.user ? order.user.email : 'N/A'})</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                {/* <TableCell>
                  <Button size="small">View Details</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}