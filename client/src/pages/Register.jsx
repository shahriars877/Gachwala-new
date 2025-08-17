import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/api'
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Box, 
  Alert, 
  Link 
} from '@mui/material'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsSubmitting(true)

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}