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
    null
  )
}
