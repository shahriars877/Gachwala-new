// File: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // <-- 1. IMPORT THEME PROVIDER
import CssBaseline from '@mui/material/CssBaseline';   // <-- 2. IMPORT CSS BASELINE
import App from './App';
import theme from './theme'; // <-- 3. IMPORT YOUR NEW THEME
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 4. WRAP YOUR APP WITH THE THEME PROVIDER */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline resets browser default styles for consistency */}
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
