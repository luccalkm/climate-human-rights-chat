import { Box, Button, TextField, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

export default function ChatInput({ value, onChange, onSend, sending }: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  sending: boolean
}) {
  return (
    <Paper elevation={0} sx={{ width: '100%', p: 1.5, borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0f141a' }}>
      <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
        <TextField
          placeholder="Digite sua mensagem"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          fullWidth
          size="small"
          multiline
          maxRows={6}
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={onSend} disabled={sending}>
          Enviar
        </Button>
      </Box>
    </Paper>
  )
}
