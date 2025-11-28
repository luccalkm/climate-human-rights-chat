import { Box, Divider, List, ListItemButton, ListItemText, Typography, Button, IconButton, Tooltip, Stack } from '@mui/material'
import { type Chat } from '../lib/chats'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import MenuIcon from '@mui/icons-material/Menu'
import { Logout } from '@mui/icons-material'

export default function ChatDrawer({ width, chats, currentChatId, onSelect, onNew, onRename, onDelete, onLogout, collapsed, onToggleCollapse, isMobile }: {
  width: number
  chats: Chat[]
  currentChatId?: string
  onSelect: (id: string) => void
  onNew?: () => void
  onRename?: (id: string) => void
  onDelete?: (id: string) => void
  onLogout?: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
  isMobile?: boolean
}) {
  if (collapsed && !isMobile) {
    return (
      <Box p={2} sx={{ width, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Stack spacing={1} alignItems="center" sx={{ pt: 1 }}>
          <IconButton size="small" onClick={onToggleCollapse}>
            <MenuIcon />
          </IconButton>
          <Tooltip title="Nova conversa" placement="right"><IconButton size="small" onClick={onNew}><AddIcon /></IconButton></Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Logout" placement="right"><IconButton size="small" onClick={onLogout}><Logout /></IconButton></Tooltip>
        </Stack>
      </Box>
    )
  }
  return (
    <Box sx={{ width, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
      <Box p={2} display={'flex'} alignItems="center" justifyContent="space-between">
        {isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 28, height: 28, opacity: 0.9 }} />
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, letterSpacing: .4 }}>Cadê meus direitos?</Typography>
          </Box>
        ) : (
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>Conversas</Typography>
        )}
        <Stack direction="row" spacing={1}>
          {!isMobile && <IconButton size="small" onClick={onToggleCollapse}>{collapsed ? <MenuIcon /> : <MenuOpenIcon />}</IconButton>}
          <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={onNew}>Nova</Button>
        </Stack>
      </Box>
      <Divider sx={{ mb: 1, borderColor: 'rgba(255,255,255,0.08)' }} />
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List dense>
          {chats.map((c) => (
            <ListItemButton key={c.id} selected={currentChatId === c.id} onClick={() => onSelect(c.id)} sx={{ borderRadius: 1 }}>
              <ListItemText primary={c.title || 'Nova conversa'} primaryTypographyProps={{ noWrap: true }} />
              {onRename && (
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); onRename(c.id) }}><EditIcon fontSize="small" /></IconButton>
              )}
              {onDelete && (
                <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); onDelete(c.id) }}><DeleteIcon fontSize="small" /></IconButton>
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>
        <Button 
          variant='contained'
          size="small" 
          onClick={onLogout}
          startIcon={<Logout />}
          sx={{ m: 2 }}
        >
          Logout
        </Button>

    </Box>
  )
}
