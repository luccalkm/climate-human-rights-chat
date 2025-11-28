import { Box, useMediaQuery } from '@mui/material'
import { AppThemeProvider } from '../theme/AppThemeProvider'
import { theme } from '../theme/theme'
import { useChatShellState } from '../hooks/useChatShellState'
import { ResponsiveDrawer } from './ResponsiveDrawer'
import { MessagesViewport } from './MessagesViewport'
import { StickyInputBar } from './StickyInputBar'
import { SuggestionPrompts } from './SuggestionPrompts'
import { RenameDialog } from './RenameDialog'
import { DeleteDialog } from './DeleteDialog'

const drawerWidth = 300
const collapsedWidth = 72

export default function ChatShell() {
  const state = useChatShellState()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <AppThemeProvider>
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <ResponsiveDrawer
          chats={state.chats}
          currentChatId={state.currentChatId}
          mobileOpen={state.mobileOpen}
          collapsed={state.collapsed}
          onToggleMobile={state.toggleMobile}
          onToggleCollapse={state.toggleCollapse}
          onSelect={state.selectConv}
          onNew={state.newChat}
          onRename={state.openRename}
          onDelete={state.openDelete}
          onLogout={state.logout}
          isDesktop={isDesktop}
          drawerWidth={drawerWidth}
          collapsedWidth={collapsedWidth}
        />
        <Box component="main" sx={{ py: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 0 }}>
          {state.messages.length === 0 ? (
            <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', overflowY: 'auto' }}>
              <SuggestionPrompts onPick={state.sendText} />
            </Box>
          ) : (
            <MessagesViewport messages={state.messages} sending={state.sending} />
          )}
          <StickyInputBar value={state.input} onChange={state.setInput} onSend={state.send} sending={state.sending} />
          <RenameDialog
            open={!!state.renameId}
            value={state.renameTitle}
            onChange={state.setRenameTitle}
            onCancel={state.closeRename}
            onConfirm={state.applyRename}
          />
          <DeleteDialog
            open={!!state.deleteId}
            deleting={state.deleting}
            onCancel={state.closeDelete}
            onConfirm={state.confirmDelete}
          />
        </Box>
      </Box>
    </AppThemeProvider>
  )
}
