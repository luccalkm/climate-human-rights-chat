import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, IconButton, Slider, TextField, FormControlLabel, Checkbox, RadioGroup, Radio, FormLabel, FormControl, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export type FeedbackDialogProps = {
  open: boolean
  rating: number
  comment: string
  anonymous: boolean
  submitting: boolean
  email: string
  name: string
  ageRange: string
  usefulness: '' | 'Sim' | 'Não'
  onChangeEmail: (v: string) => void
  onChangeName: (v: string) => void
  onChangeAgeRange: (v: string) => void
  onChangeUsefulness: (v: '' | 'Sim' | 'Não') => void
  onChangeRating: (n: number) => void
  onChangeComment: (v: string) => void
  onToggleAnonymous: () => void
  onCancel: () => void
  onSubmit: () => void
}

export function FeedbackDialog({ open, rating, comment, anonymous, submitting, email, name, ageRange, usefulness, onChangeEmail, onChangeName, onChangeAgeRange, onChangeUsefulness, onChangeRating, onChangeComment, onToggleAnonymous, onCancel, onSubmit }: FeedbackDialogProps) {
  return (
    <Dialog open={open} onClose={submitting ? undefined : onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Avaliar experiência</Typography>
        <IconButton size="small" onClick={onCancel} disabled={submitting}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
            Preencha os campos abaixo para enviar sua avaliação. Os campos de identificação serão ignorados se optar por anonimato.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              disabled={submitting || anonymous}
              onChange={e => onChangeEmail(e.target.value)}
            />
            <TextField
              label="Nome"
              fullWidth
              value={name}
              disabled={submitting || anonymous}
              onChange={e => onChangeName(e.target.value)}
            />
            <FormControl>
              <FormLabel>Faixa de idade</FormLabel>
              <RadioGroup
                row
                value={ageRange}
                onChange={e => onChangeAgeRange(e.target.value)}
              >
                {['Entre 16 e 25','Entre 26 e 40','Entre 40 e 60','Acima de 60'].map(opt => (
                  <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} disabled={submitting} />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Acha a proposta útil?</FormLabel>
              <RadioGroup
                row
                value={usefulness}
                onChange={e => onChangeUsefulness(e.target.value as '' | 'Sim' | 'Não')}
              >
                {['Sim','Não'].map(opt => (
                  <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} disabled={submitting} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider sx={{ my: 2, opacity: 0.15 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Nota (1 a 5)</Typography>
            <Slider
              value={rating}
              onChange={(_, v) => typeof v === 'number' && onChangeRating(v)}
              min={1}
              max={5}
              step={1}
              marks={[1,2,3,4,5].map(v => ({ value: v, label: String(v) }))}
            />
          </Box>
          <TextField
            label="Comentário (opcional)"
            multiline
            minRows={3}
            maxRows={6}
            fullWidth
            value={comment}
            onChange={e => onChangeComment(e.target.value)}
            placeholder="O que ajudou? Algo que poderia melhorar?"
            disabled={submitting}
          />
          <FormControlLabel
            sx={{ mt: 1 }}
            control={<Checkbox checked={anonymous} onChange={onToggleAnonymous} />}
            label="Enviar anonimamente"
          />
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'rgba(255,255,255,0.55)' }}>
            Abriremos o formulário do Google pré-preenchido numa nova aba para confirmação.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={submitting}>Cancelar</Button>
        <Button onClick={onSubmit} variant="contained" disabled={submitting || rating < 1}>
          {submitting ? 'Gerando link...' : 'Enviar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
