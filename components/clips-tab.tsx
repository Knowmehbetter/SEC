"use client"

export default function ClipsTab() {
  const clips = [
    {
      id: 1,
      title: "Gen Z Quant (Pump.fun)",
      duration: "2:34",
      views: "1.2K",
      thumbnail: "/images/gen-z-quant-thumbnail.png",
      videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kid%20Rugs%20Pulls%2020k%20on%20Solana%20Memecoin%20pump.fun%20Quant%20thanks%20for%20the%2020%20bandos%20-%20Pudges%20%F0%9F%94%B4%20%28720p%2C%20h264%29-bZOAAim8Jyxq9U52EfOLDJBRjArx6w.mp4",
    },
    {
      id: 2,
      title: "Implementing Crypto Actions",
      duration: "4:12",
      views: "856",
      thumbnail: "/placeholder-cmvt9.png",
    },
    {
      id: 3,
      title: "Glassmorphism Design System",
      duration: "3:45",
      views: "2.1K",
      thumbnail: "/placeholder-f1ec0.png",
    },
    {
      id: 4,
      title: "Mobile Responsive Streaming",
      duration: "1:58",
      views: "743",
      thumbnail: "/placeholder-wmt1c.png",
    },
    {
      id: 5,
      title: "Theme Toggle Implementation",
      duration: "2:21",
      views: "1.5K",
      thumbnail: "/placeholder-a94ii.png",
    },
    {
      id: 6,
      title: "Real-time Chat Integration",
      duration: "5:03",
      views: "967",
      thumbnail: "/placeholder-0gowo.png",
    },
  ]

  const handleClipClick = (clip: any) => {
    if (clip.videoUrl) {
      const modal = document.getElementById("clipModal") as HTMLElement
      const player = document.getElementById("clipPlayer") as HTMLVideoElement

      if (modal && player) {
        player.src = clip.videoUrl + "#t=0.001"
        modal.hidden = false
        modal.setAttribute("aria-hidden", "false")
        player.play().catch(() => {})
      }
    }
  }

  return (
    <div>
      <h3 className="font-heading font-semibold text-xl mb-6">Recent Clips</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clips.map((clip) => (
          <div
            key={clip.id}
            id={clip.id === 1 ? "clip-1" : undefined}
            className="glass rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
            onClick={() => handleClipClick(clip)}
          >
            <div className="aspect-video bg-black/20 relative overflow-hidden clip-thumb">
              <img
                src={clip.thumbnail || "/placeholder.svg"}
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs font-mono play">
                {clip.duration}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-[var(--color-accent-cyan)] transition-colors">
                {clip.title}
              </h4>
              <p className="text-xs text-[var(--color-text-muted)]">{clip.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
