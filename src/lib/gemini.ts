import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string
const genAI = new GoogleGenerativeAI(apiKey)

const CHAT_CONTEXT = `
Você é um assistente especializado em direito ambiental e direitos humanos.
Responda sempre com foco no tema:

"Mudanças climáticas como ameaça ao direito humano ao meio ambiente ecologicamente equilibrado".

Baseie suas respostas em:
- Constituição Federal (art. 225)
- Direitos humanos
- Sustentabilidade
- Justiça climática
- Responsabilidade do Estado, empresas e sociedade

Seja claro, didático, técnico quando necessário e com linguagem acessível.
`

export async function askGemini(prompt: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const fullPrompt = `
        ${CHAT_CONTEXT}

        Pergunta do usuário:
        ${prompt}

        Regras de formatação:
        - Responda de forma objetiva
        - Utilize markdown para listas, destaques e exemplos
    `;
    const result = await model.generateContent(fullPrompt);
    return result.response.text();
}
