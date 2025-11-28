import { Drawer, Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChatDrawer from './ChatDrawer'
import { type Chat } from '../lib/chats'

export function ResponsiveDrawer({
  chats,
  currentChatId,
  mobileOpen,
  collapsed,
  onToggleMobile,
  onToggleCollapse,
  onSelect,
  onNew,
  onRename,
  onDelete,
  onLogout,
  isDesktop,
  drawerWidth,
  collapsedWidth
}: {
  chats: Chat[]
  currentChatId?: string
  mobileOpen: boolean
  collapsed: boolean
  onToggleMobile: () => void
  onToggleCollapse: () => void
  onSelect: (id: string) => void
  onNew: () => void
  onRename: (id: string) => void
  onDelete: (id: string) => void
  onLogout: () => void
  isDesktop: boolean
  drawerWidth: number
  collapsedWidth: number
}) {
  return (
    <Box component="nav" sx={{ width: { sm: collapsed ? collapsedWidth : drawerWidth }, flexShrink: { sm: 0 } }}>
      {!isDesktop && (
        <Box sx={{ position: 'fixed', top: 8, left: mobileOpen ? "85%" : 8, zIndex: t => t.zIndex.drawer + 2, display: { xs: 'flex', sm: 'none' } }}>
          <IconButton color="primary" onClick={onToggleMobile}>
            {!mobileOpen && <MenuIcon />}
          </IconButton>
        </Box>
      )}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onToggleMobile}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: drawerWidth, backgroundColor: '#0b0f13' } }}
        >
          <ChatDrawer
            width={drawerWidth}
            chats={chats}
            currentChatId={currentChatId}
            onSelect={onSelect}
            onNew={onNew}
            onRename={onRename}
            onDelete={onDelete}
            onLogout={onLogout}
            collapsed={false}
            onToggleCollapse={() => {}}
            isMobile
          />
        </Drawer>
      )}
      {isDesktop && (
        <Drawer
          variant="permanent"
          open
          PaperProps={{
            sx: {
              width: collapsed ? collapsedWidth : drawerWidth,
              transition: 'width 0.25s',
              overflow: 'hidden',
              backgroundColor: '#0b0f13',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              boxSizing: 'border-box'
            }
          }}
        >
          <ChatDrawer
            width={collapsed ? collapsedWidth : drawerWidth}
            chats={chats}
            currentChatId={currentChatId}
            onSelect={onSelect}
            onNew={onNew}
            onRename={onRename}
            onDelete={onDelete}
            onLogout={onLogout}
            collapsed={collapsed}
            onToggleCollapse={onToggleCollapse}
          />
        </Drawer>
      )}
    </Box>
  )
}
