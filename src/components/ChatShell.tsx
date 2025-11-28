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
import { FeedbackDialog } from './FeedbackDialog'
import FeedbackIcon from '@mui/icons-material/ThumbUpAlt'

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
          <FeedbackDialog
            open={state.feedbackOpen}
            rating={state.feedbackRating}
            comment={state.feedbackComment}
            anonymous={state.feedbackAnon}
            submitting={state.feedbackSubmitting}
            email={state.feedbackEmail}
            name={state.feedbackName}
            ageRange={state.feedbackAgeRange}
            usefulness={state.feedbackUsefulness}
            onChangeEmail={state.setFeedbackEmail}
            onChangeName={state.setFeedbackName}
            onChangeAgeRange={state.setFeedbackAgeRange}
            onChangeUsefulness={state.setFeedbackUsefulness}
            onChangeRating={state.setFeedbackRating}
            onChangeComment={state.setFeedbackComment}
            onToggleAnonymous={() => state.setFeedbackAnon(v => !v)}
            onCancel={state.closeFeedback}
            onSubmit={state.submitFeedback}
          />
          <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 2000 }}>
            <Box
              onClick={state.openFeedback}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(6px)',
                transition: 'background .25s, border-color .25s',
                '&:hover': { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.25)' }
              }}
            >
              <FeedbackIcon fontSize="small" />
              <Box component="span" sx={{ fontSize: 13, fontWeight: 600 }}>Avaliar</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppThemeProvider>
  )
}
