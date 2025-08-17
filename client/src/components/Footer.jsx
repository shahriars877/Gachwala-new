import { Box, Container, Typography, Link } from '@mui/material'

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto', 
        backgroundColor: 'primary.main', 
        color: 'primary.contrastText'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Gachwala - Your Plant Store
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>Terms</Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>Privacy</Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>Contact</Link>
        </Typography>
      </Container>
    </Box>
  )
}