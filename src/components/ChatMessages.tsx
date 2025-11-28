import { Box, Stack } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { type ChatMessage } from '../lib/chats'

export default function ChatMessages({ messages }: { messages: ChatMessage[] }) {
  const t = useTheme()
  const userBg = alpha(t.palette.primary.main, 0.18)
  const userBorder = `1px solid ${alpha(t.palette.primary.main, 0.45)}`
  const modelBg = t.palette.background.paper
  const modelBorder = `1px solid ${t.palette.divider}`
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {messages.map((m) => (
          <Box
            key={m.id}
            sx={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <Box sx={{ maxWidth: { xs: '100%', sm: '82%', md: '72%' } }}>
              <Box
                sx={{
                  borderRadius: '14px',
                  px: 1.75,
                  py: 1.5,
                  bgcolor: m.role === 'user' ? userBg : modelBg,
                  color: m.role === 'user' ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.9)',
                  border: m.role === 'user' ? userBorder : modelBorder,
                  boxShadow: m.role === 'user' ? `0 4px 14px -6px ${alpha(t.palette.primary.main, 0.4)}` : 'none',
                  '& a': { color: t.palette.primary.main },
                  '& code': {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 1,
                    px: 0.6,
                    py: 0.1,
                    fontSize: '0.92em'
                  },
                  '& pre': {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 2,
                    p: 1.2,
                    overflowX: 'auto'
                  },
                  '& p': { my: 1 }
                }}
              >
                {m.role === 'model' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                ) : (
                  m.content
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
