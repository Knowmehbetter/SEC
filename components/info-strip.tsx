"use client"

import { useState, useEffect } from "react"
import { Circle, Users, Settings, Volume2, Maximize } from "lucide-react"

export default function InfoStrip() {
  const [viewers, setViewers] = useState(532)
  const [time, setTime] = useState("00:00:00")

  useEffect(() => {
    // Animate viewer count
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)

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
      clearInterval(interval)
      clearInterval(timerInterval)
    }
  }, [])

  return (
    <div className="flex items-center justify-between mt-4 text-sm text-[var(--color-text-muted)]">
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

        <span>Auto 1080p</span>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-4">
        <button className="hover:text-[var(--color-text-primary)] transition-colors">
          <Volume2 size={16} />
        </button>

        <button className="hover:text-[var(--color-text-primary)] transition-colors">
          <Maximize size={16} />
        </button>

        <button className="hover:text-[var(--color-text-primary)] transition-colors">
          <Settings size={16} />
        </button>
      </div>
    </div>
  )
}
