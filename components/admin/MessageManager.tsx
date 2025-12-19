'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export function MessageManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [filter])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const url =
        filter === 'all'
          ? '/api/contact-messages'
          : `/api/contact-messages?read=${filter === 'read'}`
      const res = await fetch(url)
      const data = await res.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact-messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      })
      fetchMessages()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const markAsUnread = async (id: string) => {
    try {
      await fetch(`/api/contact-messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: false }),
      })
      fetchMessages()
    } catch (error) {
      console.error('Error marking as unread:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      await fetch(`/api/contact-messages/${id}`, {
        method: 'DELETE',
      })
      fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  if (loading) {
    return <p className="text-gray-400">Loading messages...</p>
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="mt-1 text-sm text-gray-400">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </Button>
          <Button
            variant={filter === 'read' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('read')}
          >
            Read
          </Button>
        </div>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-400">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-lg border p-4 ${
                message.read
                  ? 'border-gray-800 bg-gray-800/50'
                  : 'border-red-600/50 bg-red-600/10'
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{message.name}</h3>
                  <p className="text-sm text-gray-400">{message.email}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
                {!message.read && (
                  <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                    New
                  </span>
                )}
              </div>
              <p className="mb-4 whitespace-pre-wrap text-gray-300">{message.message}</p>
              <div className="flex gap-2">
                {!message.read ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(message.id)}
                  >
                    Mark as Read
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsUnread(message.id)}
                  >
                    Mark as Unread
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMessage(message.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href={`mailto:${message.email}`}>Reply</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



