import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress, Box } from '@mui/material'

export function DeleteDialog({ open, deleting, onCancel, onConfirm }: { open: boolean; deleting: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <Dialog open={open} onClose={deleting ? undefined : onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Excluir conversa</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
          Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={deleting}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={deleting} startIcon={deleting ? <CircularProgress size={16} /> : undefined}>
          {deleting ? 'Excluindo...' : 'Excluir'}
        </Button>
      </DialogActions>
      {deleting && (
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.25)', pointerEvents: 'none' }} />
      )}
    </Dialog>
  )
}
