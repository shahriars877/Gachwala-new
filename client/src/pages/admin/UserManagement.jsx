// File: src/pages/admin/UserManagement.jsx (Corrected Version)

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
  Paper,
  Chip,
  Button // <-- ADD THIS MISSING IMPORT
} from '@mui/material';
import { fetchUsers } from '../../utils/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === 'admin' ? 'primary' : 'default'}
                  />
                </TableCell>
                {/* <TableCell>
                  <Button size="small">Edit Role</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}