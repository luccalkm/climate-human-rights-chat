import { useState } from 'react'
import { Box, Container, TextField, Typography, Button, Stack, Link, Card, CardContent, Alert } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            if (password !== confirm) {
                throw new Error('As senhas não coincidem.')
            }
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/chat')
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Erro ao registrar'
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', boxShadow: 6, borderRadius: 3, background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(6px) saturate(140%)' }}>
                <CardContent>
                    <Box py={1}>
                        <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                            Criar conta
                        </Typography>
                        {error && (
                            <Alert severity="error" sx={{ overflow: 'hidden' }}>
                                <Box sx={{ display: 'block', maxHeight: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {error}
                                </Box>
                            </Alert>
                        )}
                        <Box component="form" onSubmit={onSubmit}>
                            <Stack spacing={2} sx={{ mt: 1 }}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    size="small"
                                    autoComplete="email"
                                />
                                <TextField
                                    label="Senha"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    size="small"
                                    autoComplete="new-password"
                                />
                                <TextField
                                    label="Confirmar senha"
                                    type="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    fullWidth
                                    size="small"
                                    autoComplete="new-password"
                                />
                                <Button type="submit" variant="contained" disabled={loading} fullWidth sx={{ py: 1.1, textTransform: 'none', fontWeight: 600 }}>
                                    {loading ? 'Registrando...' : 'Registrar'}
                                </Button>
                                <Typography variant="body2" textAlign="center">
                                    Já tem conta? <Link href="/login">Entrar</Link>
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
