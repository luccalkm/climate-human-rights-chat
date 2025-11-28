import { db } from './firebase'
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot, getDocs, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'

export type Chat = {
  id: string
  title: string
  userId: string
  createdAt: Timestamp | null
}

export type ChatMessage = {
  id?: string
  chatId: string
  role: 'user' | 'model'
  content: string
  createdAt?: Timestamp | null
}

export async function createChat(userId: string, title: string) {
  const ref = await addDoc(collection(db, 'chats'), {
    title,
    userId,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function renameChat(chatId: string, title: string) {
  await updateDoc(doc(db, 'chats', chatId), { title })
}

export async function deleteChat(chatId: string) {
  await deleteDoc(doc(db, 'chats', chatId))
}

export async function listChats(userId: string) {
  const q = query(
    collection(db, 'chats'),
    where('userId', '==', userId)
  )
  const snap = await getDocs(q)
  const items = snap.docs.map((d) => {
    const data = d.data() as { title: string; userId: string; createdAt?: Timestamp }
    return {
      id: d.id,
      title: data.title,
      userId: data.userId,
      createdAt: data.createdAt ?? null,
    } satisfies Chat
  })
  items.sort((a, b) => {
    const at = a.createdAt?.toMillis?.() ?? 0
    const bt = b.createdAt?.toMillis?.() ?? 0
    return bt - at
  })
  return items
}

export async function saveChatMessage(message: Omit<ChatMessage, 'id' | 'createdAt'>) {
  const ref = await addDoc(collection(db, 'messages'), {
    ...message,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export function listenChatMessages(chatId: string, cb: (msgs: ChatMessage[]) => void) {
  const q = query(
    collection(db, 'messages'),
    where('chatId', '==', chatId),
    orderBy('createdAt', 'asc')
  )
  return onSnapshot(q, (snap) => {
    const msgs: ChatMessage[] = snap.docs.map((d) => {
      const data = d.data() as { chatId: string; role: 'user' | 'model'; content: string; createdAt?: Timestamp }
      return {
        id: d.id,
        chatId: data.chatId,
        role: data.role,
        content: data.content,
        createdAt: data.createdAt ?? null,
      }
    })
    cb(msgs)
  })
}
