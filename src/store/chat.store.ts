import { create } from 'zustand'
import { auth } from '../lib/firebase'
import { askGemini } from '../lib/gemini'
import {
  createChat,
  renameChat,
  deleteChat,
  listChats,
  listenChatMessages,
  saveChatMessage,
  type Chat,
  type ChatMessage,
} from '../lib/chats'

type ChatStore = {
  chats: Chat[]
  messages: (ChatMessage & { local?: boolean })[]
  currentChatId?: string
  loading: boolean
  sending: boolean
  deleting: boolean
  error?: string
  loadChats: () => Promise<void>
  selectChat: (id: string) => void
  listenCurrent: () => () => void
  newChat: () => Promise<void>
  newChatAndSend: (text: string) => Promise<void>
  sendToCurrent: (text: string) => Promise<void>
  renameCurrent: (title: string) => Promise<void>
  deleteCurrent: () => Promise<void>
  clearError: () => void
}

export const useChat = create<ChatStore>((set, get) => ({
  chats: [],
  messages: [],
  currentChatId: undefined,
  loading: false,
  sending: false,
  deleting: false,
  error: undefined,

  loadChats: async () => {
    const uid = auth.currentUser?.uid
    if (!uid) return
    set({ loading: true })
    try {
      const chats = await listChats(uid)
      set({ chats })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro ao carregar conversas'
      set({ error: message })
    } finally {
      set({ loading: false })
    }
  },

  selectChat: (id) => set({ currentChatId: id }),

  listenCurrent: () => {
    const id = get().currentChatId
    if (!id) return () => {}
    const unsub = listenChatMessages(id, (msgs) => {
      const persistedKeys = new Set(msgs.map((m) => `${m.role}:${m.content}`))
      set((s) => ({
        messages: [
          ...s.messages.filter((m) => m.local && !persistedKeys.has(`${m.role}:${m.content}`)),
          ...msgs,
        ],
      }))
    })
    return unsub
  },

  newChat: async () => {
    const uid = auth.currentUser?.uid
    if (!uid) return
    try {
      const title = 'Nova conversa'
      const chatId = await createChat(uid, title)
      set((s) => ({
        currentChatId: chatId,
        chats: [{ id: chatId, title, userId: uid, createdAt: null }, ...s.chats],
        messages: []
      }))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro ao criar conversa'
      set({ error: message })
    }
  },

  newChatAndSend: async (text: string) => {
    const uid = auth.currentUser?.uid
    if (!uid || !text.trim()) return
    set({ sending: true, error: undefined })
    try {
      const chatId = await createChat(uid, text.slice(0, 60))
      set((s) => ({
        currentChatId: chatId,
        chats: [{ id: chatId, title: text.slice(0, 60), userId: uid, createdAt: null }, ...s.chats],
        messages: [
          ...s.messages,
          { id: `local-${Date.now()}`, chatId, role: 'user', content: text, local: true },
        ],
      }))
      void (async () => {
        try {
          await saveChatMessage({ chatId, role: 'user', content: text })
        } catch {
          try {
            await saveChatMessage({ chatId, role: 'user', content: text })
          } catch (e) {
            const message = e instanceof Error ? e.message : 'Falha ao salvar mensagem (user)'
            set({ error: message })
          }
        }
      })()
      const reply = await askGemini(text)
      set((s) => ({
        messages: [
          ...s.messages,
          { id: `local-${Date.now()}-model`, chatId, role: 'model', content: reply, local: true },
        ],
      }))
      void (async () => {
        try {
          await saveChatMessage({ chatId, role: 'model', content: reply })
        } catch {
          try {
            await saveChatMessage({ chatId, role: 'model', content: reply })
          } catch (e) {
            const message = e instanceof Error ? e.message : 'Falha ao salvar mensagem (model)'
            set({ error: message })
          }
        }
      })()
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro ao enviar mensagem'
      set({ error: message })
    } finally {
      set({ sending: false })
    }
  },

  sendToCurrent: async (text: string) => {
    const chatId = get().currentChatId
    const uid = auth.currentUser?.uid
    if (!uid || !chatId || !text.trim()) return
    set({ sending: true, error: undefined })
    try {
      set((s) => ({ messages: [...s.messages, { id: `local-${Date.now()}`, chatId, role: 'user', content: text, local: true }] }))
      void (async () => {
        try {
          await saveChatMessage({ chatId, role: 'user', content: text })
        } catch {
          try {
            await saveChatMessage({ chatId, role: 'user', content: text })
          } catch (e) {
            const message = e instanceof Error ? e.message : 'Falha ao salvar mensagem (user)'
            set({ error: message })
          }
        }
      })()
      const reply = await askGemini(text)
      set((s) => ({ messages: [...s.messages, { id: `local-${Date.now()}-model`, chatId, role: 'model', content: reply, local: true }] }))
      void (async () => {
        try {
          await saveChatMessage({ chatId, role: 'model', content: reply })
        } catch {
          try {
            await saveChatMessage({ chatId, role: 'model', content: reply })
          } catch (e) {
            const message = e instanceof Error ? e.message : 'Falha ao salvar mensagem (model)'
            set({ error: message })
          }
        }
      })()
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro ao enviar mensagem'
      set({ error: message })
    } finally {
      set({ sending: false })
    }
  },

  renameCurrent: async (title: string) => {
    const id = get().currentChatId
    if (!id) return
    try {
      await renameChat(id, title)
      await get().loadChats()
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro ao renomear conversa'
      set({ error: message })
    }
  },

  deleteCurrent: async () => {
    const id = get().currentChatId
    if (!id) return
    set({ deleting: true })
    try {
      await deleteChat(id)
      await get().loadChats()
      const chats = get().chats
      set({ currentChatId: chats[0]?.id, messages: [] })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro ao excluir conversa'
      set({ error: message })
    }
    finally {
      set({ deleting: false })
    }
  },

  clearError: () => set({ error: undefined }),
}))
