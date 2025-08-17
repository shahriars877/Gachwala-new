// File: src/theme.js

import { createTheme } from '@mui/material/styles';

// Define your custom green theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // A nice, deep green
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFC107', // A complementary amber/yellow
      light: '#FFD54F',
      dark: '#FFA000',
      contrastText: '#000000',
    },
    background: {
      default: '#F5F5F5', // A light grey background for contrast
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;
