// IDs reais extraídos do link de exemplo de prefill fornecido.
// Se adicionar/remover perguntas no Google Forms, alguns entry IDs podem mudar.
export const FEEDBACK_FORM_ID = '1FAIpQLSfmBWjz26lNHcYfw5M_0THTCCgOgYoChCULMeXUTeDDoZvewQ'

// Mapeamento dos campos usados no formulário
export const feedbackFields = {
    email: 'entry.1717540714', // Email *
    name: 'entry.1136280268', // Nome *
    ageRange: 'entry.767069304', // Idade * (Entre 16 e 25, etc.)
    usefulness: 'entry.36678030', // Achou a proposta útil? Sim/Não
    rating: 'entry.132125227', // Dê uma nota (1..5)
} as const

export type FeedbackPayload = {
    email?: string
    name?: string
    ageRange?: string
    usefulness?: 'Sim' | 'Não'
    rating: number
    comment?: string
    userId?: string
    chatId?: string
    anonymous?: boolean
}

export function buildFeedbackUrl(payload: FeedbackPayload): string {
    const base = `https://docs.google.com/forms/d/e/${FEEDBACK_FORM_ID}/viewform?usp=pp_url`
    const params: string[] = []

    if (payload.email) params.push(`${feedbackFields.email}=${encodeURIComponent(payload.email)}`)
    if (payload.name) params.push(`${feedbackFields.name}=${encodeURIComponent(payload.name)}`)
    if (payload.ageRange) params.push(`${feedbackFields.ageRange}=${encodeURIComponent(payload.ageRange)}`)
    if (payload.usefulness) params.push(`${feedbackFields.usefulness}=${encodeURIComponent(payload.usefulness)}`)

    params.push(`${feedbackFields.rating}=${encodeURIComponent(String(payload.rating))}`)

    return `${base}&${params.join('&')}`
}
