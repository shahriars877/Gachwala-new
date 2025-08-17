import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained"
        size="large"
      >
        Go to Homepage
      </Button>
    </Container>
  )
}