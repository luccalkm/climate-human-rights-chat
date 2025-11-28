import { Box } from '@mui/material'
import ChatInput from './ChatInput'

export function StickyInputBar({ value, onChange, onSend, sending }: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  sending: boolean
}) {
  return (
    <Box sx={{ width: '100%', position: 'sticky', bottom: 0, p: { xs: '12px 16px', sm: '16px 24px' } }}>
      <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 1024, xl: 1180 }, mx: 'auto' }}>
        <ChatInput value={value} onChange={onChange} onSend={onSend} sending={sending} />
      </Box>
    </Box>
  )
}
