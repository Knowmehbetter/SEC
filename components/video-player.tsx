"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink, Copy } from "lucide-react"

interface VideoPlayerProps {
  onShowToast: (message: string) => void
}

const X_PROFILE_URL = "https://x.com/yourhandle"
const PUMPFUN_URL = "https://pump.fun/CA/GCDimgyzxHgEYgnNW5eaW1DnKSyjf5Ax7YCiiCTWpump"
const CONTRACT_ADDRESS = "GCDimgyzxHgEYgnNW5eaW1DnKSyjf5Ax7YCiiCTWpump"

export default function VideoPlayer({ onShowToast }: VideoPlayerProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseMove = () => {
    setShowOverlay(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setShowOverlay(false)
    }, 3000)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowOverlay(false)
  }

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      onShowToast("CA copied!")
    } catch (err) {
      onShowToast("Failed to copy CA")
    }
  }

  const openX = () => {
    window.open(X_PROFILE_URL, "_blank", "noopener,noreferrer")
  }

  const openPumpFun = () => {
    window.open(PUMPFUN_URL, "_blank", "noopener,noreferrer")
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/50 stream-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-hero-media
    >
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-white/60 text-sm">Loading stream...</div>
      </div>

      {/* Overlay Controls */}
      <div
        className={`absolute bottom-4 right-4 flex gap-2 transition-all duration-300 ${
          showOverlay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <button
          onClick={openX}
          className="h-11 w-11 rounded-full glass hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 tooltip-parent text-white"
          aria-label="Open X Profile"
        >
          <ExternalLink size={18} />
          <div className="tooltip">Open X</div>
        </button>

        <button
          onClick={openPumpFun}
          className="h-11 px-4 rounded-full glass hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 tooltip-parent text-sm font-medium text-white"
          aria-label="Open Pump.fun"
        >
          Pump.fun
          <div className="tooltip">Open Pump.fun</div>
        </button>

        <button
          onClick={copyCA}
          className="h-11 px-4 rounded-full glass hover:bg-white/20 flex items-center gap-2 transition-all duration-200 hover:scale-105 tooltip-parent font-mono text-sm text-white"
          aria-label="Copy Contract Address"
        >
          <Copy size={16} />
          CA
          <div className="tooltip">Copy CA</div>
        </button>
      </div>
    </div>
  )
}
