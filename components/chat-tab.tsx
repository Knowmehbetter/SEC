"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface ChatMessage {
  id: string
  username: string
  content: string
  created_at: string
}

export default function ChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [supabase, setSupabase] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        console.log("[v0] Environment variables check:")
        console.log("[v0] NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "MISSING")
        console.log(
          "[v0] NEXT_PUBLIC_SUPABASE_ANON_KEY:",
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "MISSING",
        )

        const { createClient } = await import("@/lib/supabase/client")
        const client = createClient()

        console.log("[v0] Supabase client created successfully")
        setSupabase(client)
        setIsInitialized(true)
        setError(null)
      } catch (err) {
        console.error("[v0] Failed to initialize Supabase:", err)
        setError(`Chat connection failed: ${err instanceof Error ? err.message : "Unknown error"}`)
        setIsInitialized(false)
      }
    }

    initializeSupabase()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isInitialized || !supabase) return

    // Generate random username for anonymous chat
    setUsername(`viewer${Math.floor(Math.random() * 10000)}`)

    // Load initial messages
    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .order("created_at", { ascending: true })
          .limit(50)

        if (error) {
          console.error("[v0] Error loading messages:", error)
          setError("Failed to load chat messages")
        } else if (data) {
          setMessages(data)
          setError(null)
        }
      } catch (err) {
        console.error("[v0] Unexpected error loading messages:", err)
        setError("Chat is currently unavailable")
      }
    }

    loadMessages()

    // Set up real-time subscription
    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          const newComment = payload.new as ChatMessage
          setMessages((prev) => [...prev, newComment])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [isInitialized, supabase])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !isInitialized || !supabase) return

    console.log("[v0] Sending message:", newMessage.trim())

    try {
      const { error } = await supabase.from("comments").insert({
        content: newMessage.trim(),
        username: username,
      })

      if (error) {
        console.error("[v0] Error sending message:", error)
        setError("Failed to send message. Please try again.")
      } else {
        console.log("[v0] Message sent successfully")
        setNewMessage("")
        setError(null)
      }
    } catch (err) {
      console.error("[v0] Unexpected error:", err)
      setError("Unable to send message. Please check your connection.")
    }
  }

  if (!isInitialized) {
    return (
      <div className="h-96 flex flex-col items-center justify-center p-6 text-center">
        <div className="glass rounded-lg p-6 border border-white/10 max-w-md">
          <h3 className="text-lg font-semibold text-foreground mb-3">Chat Unavailable</h3>
          <p className="text-sm text-muted-foreground mb-4">{error || "Unable to connect to the chat service."}</p>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Required environment variables:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
            <p className="mt-3">
              <strong>To fix:</strong> Click the gear icon (⚙️) → Environment Variables → Add your Supabase credentials
            </p>
            <p className="mt-2 text-xs opacity-75">Check browser console for detailed error information.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-96 flex flex-col">
      {error && (
        <div className="mb-2 p-2 bg-red-500/20 border border-red-500/30 rounded text-white text-xs">{error}</div>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-accent-cyan)] text-sm font-medium">{msg.username}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full glass border border-white/10 focus:border-[var(--color-accent-cyan)] focus:outline-none text-sm"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-2 rounded-full bg-[var(--color-accent-cyan)] text-black font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
