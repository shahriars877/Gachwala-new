import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom color="primary">
        Order Placed Successfully!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Your Order ID: {orderId}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          component={Link} 
          to="/orders"
          sx={{ mr: 2 }}
        >
          View Orders
        </Button>
        <Button 
          variant="outlined" 
          component={Link} 
          to="/products"
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}