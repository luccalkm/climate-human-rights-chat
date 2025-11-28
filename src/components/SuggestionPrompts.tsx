import { Box, Typography } from '@mui/material'
import { suggestions } from '../lib/questionSuggestion'
import { useState } from 'react'

export function SuggestionPrompts({ onPick }: { onPick: (text: string) => void }) {
  const [display] = useState<string[]>(() => {
    const arr = [...suggestions]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, Math.min(6, arr.length))
  });
  
  return (
    <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 900 }, mx: 'auto', textAlign: 'center', mt: { xs: 4, sm: 8 } }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, letterSpacing: 0.5 }}>Sugestões para começar</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {display.map(s => (
          <Box
            key={s}
            onClick={() => onPick(s)}
            sx={{
              p: 2.2,
              border: '2px dashed rgba(255,255,255,0.15)',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'background .25s, border-color .25s',
              fontSize: 14,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.3,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.35)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))'
              },
              '&:active': {
                borderColor: 'rgba(255,255,255,0.55)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))'
              }
            }}
          >
            {s}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
