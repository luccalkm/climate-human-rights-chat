import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material'
import type { ReactNode } from 'react'
import { theme } from './theme'

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        'html, body, #root': { height: '100%', width: '100vw' },
        body: {
          margin: 0,
          backgroundColor: '#0d1012',
          color: 'rgba(255,255,255,0.92)',
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(62,207,142,0.06), transparent 60%), radial-gradient(circle at 80% 40%, rgba(71,181,255,0.05), transparent 65%)'
        },
        a: { color: '#3ecf8e' },
        '::-selection': { background: 'rgba(62,207,142,0.35)' },
        '*': { scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.18) transparent' },
        '*::-webkit-scrollbar': { width: '10px', height: '10px' },
        '*::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.18)',
          borderRadius: '10px',
          border: '2px solid transparent',
          backgroundClip: 'content-box'
        },
        '*::-webkit-scrollbar-thumb:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
      }} />
      {children}
    </ThemeProvider>
  )
}

