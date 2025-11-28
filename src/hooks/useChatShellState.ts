import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import { useChat } from '../store/chat.store'

export function useChatShellState() {
  const { chats, messages, currentChatId, loadChats, selectChat, listenCurrent, newChat, newChatAndSend, sendToCurrent, deleteCurrent, sending, deleting } = useChat()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [input, setInput] = useState('')
  const [renameId, setRenameId] = useState<string | null>(null)
  const [renameTitle, setRenameTitle] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState(3)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedbackAnon, setFeedbackAnon] = useState(false)
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)
  const [feedbackEmail, setFeedbackEmail] = useState('')
  const [feedbackName, setFeedbackName] = useState('')
  const [feedbackAgeRange, setFeedbackAgeRange] = useState('')
  const [feedbackUsefulness, setFeedbackUsefulness] = useState<'Sim' | 'Não' | ''>('')

  useEffect(() => { loadChats() }, [loadChats])
  useEffect(() => { const unsub = listenCurrent(); return () => unsub() }, [currentChatId, listenCurrent])

  const toggleMobile = () => setMobileOpen(o => !o)
  const toggleCollapse = () => setCollapsed(c => !c)

  const selectConv = (id: string) => { selectChat(id); setMobileOpen(false) }

  const send = async () => {
    if (!input.trim() || sending) return
    const uid = auth.currentUser?.uid
    if (!uid) return
    if (!currentChatId) await newChatAndSend(input)
    else await sendToCurrent(input)
    setInput('')
  }

  const sendText = async (text: string) => {
    if (!text.trim() || sending) return
    const uid = auth.currentUser?.uid
    if (!uid) return
    if (!currentChatId) await newChatAndSend(text)
    else await sendToCurrent(text)
    setInput('')
  }

  const openRename = (id: string) => { setRenameId(id); setRenameTitle('') }
  const closeRename = () => setRenameId(null)
  const applyRename = async () => {
    if (renameId && renameTitle.trim()) {
      await useChat.getState().renameCurrent(renameTitle.trim())
      setRenameId(null)
    }
  }

  const deleteConv = async (id: string) => {
    selectChat(id)
    await deleteCurrent()
    setDeleteId(null)
  }

  const openDelete = (id: string) => { setDeleteId(id) }
  const closeDelete = () => setDeleteId(null)
  const confirmDelete = async () => { if (deleteId) await deleteConv(deleteId) }

  const logout = async () => {
    await signOut(auth)
  }

  const openFeedback = () => setFeedbackOpen(true)
  const closeFeedback = () => { if (!feedbackSubmitting) setFeedbackOpen(false) }
  const submitFeedback = async () => {
    if (feedbackSubmitting) return
    setFeedbackSubmitting(true)
    try {
      const uid = auth.currentUser?.uid
      const { buildFeedbackUrl } = await import('../lib/feedback')
      const url = buildFeedbackUrl({
        rating: feedbackRating,
        comment: feedbackComment,
        email: feedbackEmail || undefined,
        name: feedbackName || undefined,
        ageRange: feedbackAgeRange || undefined,
        usefulness: feedbackUsefulness || undefined,
        userId: uid,
        chatId: currentChatId,
        anonymous: feedbackAnon
      })
      window.open(url, '_blank')
      setFeedbackOpen(false)
      setFeedbackComment('')
      setFeedbackRating(3)
      setFeedbackAnon(false)
      setFeedbackEmail('')
      setFeedbackName('')
      setFeedbackAgeRange('')
      setFeedbackUsefulness('')
    } finally {
      setFeedbackSubmitting(false)
    }
  }

  return {
    chats,
    messages,
    currentChatId,
    sending,
    deleting,
    mobileOpen,
    collapsed,
    input,
    renameId,
    renameTitle,
    deleteId,
    setInput,
    setRenameTitle,
    toggleMobile,
    toggleCollapse,
    selectConv,
    newChat,
    send,
    sendText,
    openRename,
    closeRename,
    applyRename,
    deleteConv,
    openDelete,
    closeDelete,
    confirmDelete,
    logout,
    feedbackOpen,
    feedbackRating,
    feedbackComment,
    feedbackAnon,
    feedbackSubmitting,
    feedbackEmail,
    feedbackName,
    feedbackAgeRange,
    feedbackUsefulness,
    openFeedback,
    closeFeedback,
    submitFeedback,
    setFeedbackRating,
    setFeedbackComment,
    setFeedbackAnon,
    setFeedbackEmail,
    setFeedbackName,
    setFeedbackAgeRange,
    setFeedbackUsefulness
  }
}
