'use client';

import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: { main: '#6366F1' },
    background: {
      default: '#F8FAFC'
    }
  },
  shape: { borderRadius: 12 }
});

export default theme;
