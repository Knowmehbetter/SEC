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

          <div className="flex flex-wrap gap-2 mb-4"></div>

          <button
            onClick={copyCA}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 text-sm font-mono tooltip-parent"
          >
            <Copy size={14} />
            Copy CA
            <div className="tooltip">Copy Contract Address</div>
          </button>
        </div>

        <div className="flex flex-wrap gap-2"></div>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          marginTop: "20px",
          borderRadius: "20px",
          padding: "25px",
          background: "#000",
          backgroundImage: "radial-gradient(circle at center, #111 0%, #000 100%)",
          boxShadow: "0 0 40px rgba(0,0,0,0.8), inset 0 0 80px rgba(0,0,0,0.7)",
          border: "8px solid #222",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 10,
          }}
        >
          {/* X Button */}
          <a
            href="https://x.com"
            target="_blank"
            style={{
              width: "45px",
              height: "45px",
              background: "#111",
              border: "2px solid #444",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 6px #000, 0 0 8px rgba(0,0,0,0.8)",
              color: "#fff",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "monospace",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#222")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#111")}
            rel="noreferrer"
          >
            X
          </a>

          {/* Pump.fun Button */}
          <a
            href="https://pump.fun"
            target="_blank"
            style={{
              width: "45px",
              height: "45px",
              background: "#111",
              border: "2px solid #444",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 6px #000, 0 0 8px rgba(0,0,0,0.8)",
              color: "#0f0",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: "bold",
              fontFamily: "monospace",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#222")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#111")}
            rel="noreferrer"
          >
            PF
          </a>
        </div>

        {/* TV Screen Effect */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            background: "#000",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.9)",
          }}
        >
          <iframe
            src="https://dexscreener.com/solana/4gjoepgiq2fuam8mp6yvge8p5pbcaevtolqeqfwjvefx?embed=1&theme=dark"
            style={{ width: "100%", height: "600px", border: "0", borderRadius: "12px" }}
            allowFullScreen
          />
        </div>

        {/* TV Legs */}
        <div
          style={{
            position: "absolute",
            bottom: "-25px",
            left: "20%",
            width: "20%",
            height: "20px",
            background: "#222",
            borderRadius: "5px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-25px",
            right: "20%",
            width: "20%",
            height: "20px",
            background: "#222",
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  )
}
