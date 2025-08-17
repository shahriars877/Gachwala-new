import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
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

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" underline="hover">
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}