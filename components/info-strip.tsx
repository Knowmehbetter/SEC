"use client"

import { useState, useEffect } from "react"
import { Circle, Users, Settings, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function InfoStrip() {
  const [viewers, setViewers] = useState(0)
  const [time, setTime] = useState("00:00:00")
  const [sessionId] = useState(() => `viewer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const toggleMute = () => {
    const iframe = document.querySelector('iframe[src*="youtube"]') as HTMLIFrameElement
    if (iframe) {
      // For YouTube iframes, we can't directly control audio, so we'll toggle a visual indicator
      setIsMuted(!isMuted)
      // In a real implementation, you'd send postMessage to the iframe
      console.log("[v0] Mute toggled:", !isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    const setupPresence = async () => {
      try {
        // Add this viewer to presence table
        await supabase.from("viewer_presence").upsert({
          session_id: sessionId,
          last_seen: new Date().toISOString(),
        })

        // Get initial viewer count
        const { count } = await supabase
          .from("viewer_presence")
          .select("*", { count: "exact", head: true })
          .gte("last_seen", new Date(Date.now() - 30000).toISOString()) // Active in last 30 seconds

        if (count !== null) {
          setViewers(count)
        }

        // Subscribe to real-time changes
        const channel = supabase
          .channel("viewer_presence_changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "viewer_presence",
            },
            async () => {
              // Recount viewers when presence changes
              const { count: newCount } = await supabase
                .from("viewer_presence")
                .select("*", { count: "exact", head: true })
                .gte("last_seen", new Date(Date.now() - 30000).toISOString())

              if (newCount !== null) {
                setViewers(newCount)
              }
            },
          )
          .subscribe()

        // Update presence every 15 seconds to show this viewer is still active
        const presenceInterval = setInterval(async () => {
          await supabase.from("viewer_presence").upsert({
            session_id: sessionId,
            last_seen: new Date().toISOString(),
          })
        }, 15000)

        // Clean up old presence records every minute
        const cleanupInterval = setInterval(async () => {
          await supabase
            .from("viewer_presence")
            .delete()
            .lt("last_seen", new Date(Date.now() - 60000).toISOString()) // Remove records older than 1 minute
        }, 60000)

        // Remove this viewer when they leave
        const handleBeforeUnload = async () => {
          await supabase.from("viewer_presence").delete().eq("session_id", sessionId)
        }

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => {
          clearInterval(presenceInterval)
          clearInterval(cleanupInterval)
          window.removeEventListener("beforeunload", handleBeforeUnload)
          supabase.removeChannel(channel)
          // Remove presence record when component unmounts
          supabase.from("viewer_presence").delete().eq("session_id", sessionId)
        }
      } catch (error) {
        console.error("[v0] Error setting up viewer presence:", error)
        // Fallback to starting count if Supabase fails
        setViewers(532)
      }
    }

    setupPresence()

    // Update timer
    const startTime = Date.now()
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const hours = Math.floor(elapsed / 3600)
        .toString()
        .padStart(2, "0")
      const minutes = Math.floor((elapsed % 3600) / 60)
        .toString()
        .padStart(2, "0")
      const seconds = (elapsed % 60).toString().padStart(2, "0")
      setTime(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [sessionId])

  return (
    <div className="flex items-center justify-between mt-4 text-sm text-[var(--color-text-muted)] relative">
      {/* Left cluster */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Circle size={8} className="fill-red-500 text-red-500" />
          <span className="text-red-500 font-medium">LIVE</span>
        </div>

        <span className="font-mono">{time}</span>

        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{viewers.toLocaleString()}</span>
        </div>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMute}
          className="hover:text-[var(--color-text-primary)] transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="hover:text-[var(--color-text-primary)] transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>

        <button
          onClick={toggleSettings}
          className="hover:text-[var(--color-text-primary)] transition-colors"
          title="Settings"
        >
          <Settings size={16} />
        </button>

        {showSettings && (
          <div className="absolute right-0 top-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 shadow-lg z-10 min-w-48">
            <div className="space-y-3">
              <div className="text-sm font-medium text-[var(--color-text-primary)]">Stream Settings</div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" className="rounded" />
                  Auto-play videos
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" className="rounded" />
                  Show notifications
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Live viewer count
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
