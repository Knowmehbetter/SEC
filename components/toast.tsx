"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
    } else {
      const timer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!show) return null

  return (
    <div className="fixed top-20 right-4 z-50">
      <div
        className={`glass rounded-xl px-4 py-3 flex items-center gap-2 shadow-lg transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <Check size={16} className="text-[var(--color-accent-green)]" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
