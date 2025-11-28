import { Box } from '@mui/material'
import { type ChatMessage } from '../lib/chats'
import ChatMessages from './ChatMessages'

type Msg = ChatMessage & { local?: boolean }

export function MessagesViewport({ messages, sending }: { messages: Msg[]; sending: boolean }) {
  const lastRole = messages[messages.length - 1]?.role
  const showThinking = sending && lastRole === 'user'
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', width: '100%', maxWidth: { xs: '100%', sm: 1024, xl: 1180 }, px: { xs: 2, sm: 3 } }}>
      <ChatMessages messages={messages} />
      {showThinking && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              px: 2.2,
              py: 1.4,
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(140deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              '@keyframes blink': {
                '0%, 80%, 100%': { opacity: 0.2 },
                '40%': { opacity: 1 }
              }
            }}
          >
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', animation: 'blink 1.2s infinite' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', animation: 'blink 1.2s infinite', animationDelay: '0.2s' }} />
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', animation: 'blink 1.2s infinite', animationDelay: '0.4s' }} />
            <Box sx={{ ml: 1, fontSize: 14, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.2 }}>Pensando...</Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
