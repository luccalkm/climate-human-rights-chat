import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3ecf8e' },
    secondary: { main: '#47b5ff' },
    success: { main: '#3ecf8e' },
    info: { main: '#2f81f7' },
    warning: { main: '#f5b74e' },
    error: { main: '#f04438' },
    background: { default: '#0d1012', paper: '#111417' },
    divider: 'rgba(255,255,255,0.08)'
  },
  typography: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 18px -2px rgba(0,0,0,0.5)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600
        }
      }
    }
  }
})
