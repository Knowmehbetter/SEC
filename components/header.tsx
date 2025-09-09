"use client"

import { Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  theme: "dark" | "light"
  onToggleTheme: () => void
  onShowToast: (message: string) => void
}

const X_PROFILE_URL = "https://x.com/i/communities/1965539767363477995"
const PUMPFUN_URL = "https://pump.fun/CA/GCDimgyzxHgEYgnNW5eaW1DnKSyjf5Ax7YCiiCTWpump"

export default function Header({ theme, onToggleTheme, onShowToast }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const openX = () => {
    window.open(X_PROFILE_URL, "_blank", "noopener,noreferrer")
  }

  const openPumpFun = () => {
    window.open(PUMPFUN_URL, "_blank", "noopener,noreferrer")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="sex-brand fx-sheen fx-underline font-heading font-bold text-xl text-foreground">
            Streaming Equity Index
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openX}
              className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg tooltip-parent text-foreground hidden md:flex"
              aria-label="Open X Profile"
            >
              <X size={16} />
              <div className="tooltip">Open X</div>
            </button>

            <button
              onClick={openPumpFun}
              className="h-10 px-3 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg tooltip-parent text-sm font-medium text-foreground hidden md:flex"
              aria-label="Open Pump.fun"
            >
              Pump.fun
              <div className="tooltip">Open Pump.fun</div>
            </button>

            <button
              onClick={onToggleTheme}
              className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg tooltip-parent text-foreground hidden md:flex"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <div className="tooltip">Toggle Theme</div>
            </button>

            <button
              onClick={toggleMobileMenu}
              className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg md:hidden text-foreground"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/10 md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <button
              onClick={() => {
                openX()
                setIsMobileMenuOpen(false)
              }}
              className="w-full h-12 rounded-lg glass hover:bg-white/10 flex items-center justify-center gap-3 transition-all duration-200 text-foreground"
            >
              <X size={16} />
              <span>Open X Profile</span>
            </button>

            <button
              onClick={() => {
                openPumpFun()
                setIsMobileMenuOpen(false)
              }}
              className="w-full h-12 rounded-lg glass hover:bg-white/10 flex items-center justify-center gap-3 transition-all duration-200 text-foreground"
            >
              <span>Pump.fun</span>
            </button>

            <button
              onClick={() => {
                onToggleTheme()
                setIsMobileMenuOpen(false)
              }}
              className="w-full h-12 rounded-lg glass hover:bg-white/10 flex items-center justify-center gap-3 transition-all duration-200 text-foreground"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span>Toggle Theme</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
