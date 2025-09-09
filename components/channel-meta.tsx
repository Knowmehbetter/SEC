"use client"

import { Copy } from "lucide-react"

interface ChannelMetaProps {
  onShowToast: (message: string) => void
}

const CONTRACT_ADDRESS = "GCDimgyzxHgEYgnNW5eaW1DnKSyjf5Ax7YCiiCTWpump"

export default function ChannelMeta({ onShowToast }: ChannelMetaProps) {
  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      onShowToast("CA copied!")
    } catch (err) {
      onShowToast("Failed to copy CA")
    }
  }

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h2 className="font-heading font-semibold text-[clamp(22px,3vw,32px)] mb-2">
            Live: Building IRL Streaming + Tokens
          </h2>
          <p className="text-[var(--color-text-muted)] mb-4 leading-relaxed">
            A clean, immersive stream with on-video actions
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full glass text-sm font-medium">Solana</span>
            <span className="px-3 py-1 rounded-full glass text-sm font-medium">Real-time</span>
          </div>

          <button
            onClick={copyCA}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 text-sm font-mono tooltip-parent"
          >
            <Copy size={14} />
            Copy CA
            <div className="tooltip">Copy Contract Address</div>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-full glass hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 text-sm">
            View Chart
          </button>
          <button className="px-4 py-2 rounded-full glass hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 text-sm">
            Join Telegram
          </button>
          <button className="px-4 py-2 rounded-full glass hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 text-sm">
            Docs
          </button>
        </div>
      </div>
    </div>
  )
}
