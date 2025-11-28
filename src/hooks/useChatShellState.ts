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
    logout
  }
}
