import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'

export function RenameDialog({ open, value, onChange, onCancel, onConfirm }: {
  open: boolean
  value: string
  onChange: (v: string) => void
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Renomear conversa</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Novo nome" fullWidth value={value} onChange={e => onChange(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button onClick={onConfirm}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}
