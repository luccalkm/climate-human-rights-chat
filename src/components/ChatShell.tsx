import { Box, useMediaQuery, Fab } from '@mui/material'
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
          {isDesktop && (
            <Box sx={{ position: 'fixed', top: 12, left: (state.collapsed ? collapsedWidth + 16 : drawerWidth + 16), zIndex: 1500, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 28, height: 28, opacity: 0.9 }} />
              <Box component="span" sx={{ fontSize: 13, fontWeight: 700, letterSpacing: .4, color: 'rgba(255,255,255,0.9)' }}>Cadê meus direitos?</Box>
            </Box>
          )}
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
          <Box sx={{ position: 'fixed', zIndex: 2000,  top: 12, right: 12 }}>
            <Fab
              variant="extended"
              onClick={state.openFeedback}
              sx={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontWeight: 600,
                letterSpacing: .5,
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.14)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  boxShadow: '0 6px 22px rgba(0,0,0,0.55)'
                },
                '@keyframes pulse': {
                  '0%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.35)' },
                  '70%': { boxShadow: '0 0 0 12px rgba(255,255,255,0)' },
                  '100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0)' }
                },
                animation: 'pulse 3.2s ease-in-out infinite'
              }}
              size={isDesktop ? 'medium' : 'small'}
            >
              <FeedbackIcon sx={{ mr: 1, color: '#3ecf8e' }} /> Avaliar
            </Fab>
          </Box>
        </Box>
      </Box>
    </AppThemeProvider>
  )
}
