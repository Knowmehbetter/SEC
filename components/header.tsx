"use client"

import { Sun, Moon, Menu, ExternalLink } from "lucide-react"

interface HeaderProps {
  theme: "dark" | "light"
  onToggleTheme: () => void
  onShowToast: (message: string) => void
}

const X_PROFILE_URL = "https://x.com/yourhandle"
const PUMPFUN_URL = "https://pump.fun/CA/GCDimgyzxHgEYgnNW5eaW1DnKSyjf5Ax7YCiiCTWpump"

export default function Header({ theme, onToggleTheme, onShowToast }: HeaderProps) {
  const openX = () => {
    window.open(X_PROFILE_URL, "_blank", "noopener,noreferrer")
  }

  const openPumpFun = () => {
    window.open(PUMPFUN_URL, "_blank", "noopener,noreferrer")
  }

  return (
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
            className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg tooltip-parent text-foreground"
            aria-label="Open X Profile"
          >
            <ExternalLink size={16} />
            <div className="tooltip">Open X</div>
          </button>

          <button
            onClick={openPumpFun}
            className="h-10 px-3 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg tooltip-parent text-sm font-medium text-foreground"
            aria-label="Open Pump.fun"
          >
            Pump.fun
            <div className="tooltip">Open Pump.fun</div>
          </button>

          <button
            onClick={onToggleTheme}
            className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg tooltip-parent text-foreground"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <div className="tooltip">Toggle Theme</div>
          </button>

          <button
            className="h-10 w-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg md:hidden text-foreground"
            aria-label="Menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
