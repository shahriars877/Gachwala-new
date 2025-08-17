import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category, image }) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <CardActionArea 
        component={Link} 
        to={`/products?category=${encodeURIComponent(category)}`}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for text readability
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }
        }}
      >
        <CardContent>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            {category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}