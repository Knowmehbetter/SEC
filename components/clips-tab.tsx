"use client"

import type React from "react"

import { useState } from "react"

export default function ClipsTab() {
  const [playingClips, setPlayingClips] = useState<Set<number>>(new Set())

  const clips = [
    {
      id: 1,
      title: "Gen Z Quant (Pump.fun)",
      duration: "2:34",
      views: "1.2K",
      thumbnail: "/images/gen-z-quant-thumbnail.png",
      videoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kid%20Rugs%20Pulls%2020k%20on%20Solana%20Memecoin%20pump.fun%20Quant%20thanks%20for%20the%2020%20bandos%20-%20Pudges%20%F0%9F%94%B4%20%28720p%2C%20h264%29-bZOAAim8Jyxq9U52EfOLDJBRjArx6w.mp4",
    },
    {
      id: 2,
      title: "Guy dancing holds 1M subs on YouTube, 1M on TikTok and 400k on IG",
      duration: "1:45",
      views: "New clip",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YFFcQWaAo8VD06DkEU60ZnoD61zSAj.png",
      videoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SWF9oy0MiLztMxxR-kfLa4qEva62s9N5RdDaOC0dGDP4kja.mp4",
    },
    {
      id: 3,
      title: "Pedo gets caught",
      duration: "2:15",
      views: "New clip",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iJklKPbpP5V0x2mx6YTEK0qOj7mtAD.png",
      videoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yEoDWLcG9DuJ7nsR-cuGmGGhmGkggT3kYx9QpFZvDJW8ZtQ.mp4",
    },
    {
      id: 4,
      title: "Burning Paper",
      duration: "1:30",
      views: "New clip",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PyU8jkHyrxX6gs19vNHmwhsOGiPbP8.png",
      videoUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kEuc-G8DDzHLB1CW-bQS5CdfEB8eYX0qwAgF5M2oGShM1VH.mp4",
    },
    {
      id: 5,
      title: "Glassmorphism Design System",
      duration: "3:45",
      views: "2.1K",
      thumbnail: "/placeholder-f1ec0.png",
    },
    {
      id: 6,
      title: "Mobile Responsive Streaming",
      duration: "1:58",
      views: "743",
      thumbnail: "/placeholder-wmt1c.png",
    },
    {
      id: 7,
      title: "Theme Toggle Implementation",
      duration: "2:21",
      views: "1.5K",
      thumbnail: "/placeholder-a94ii.png",
    },
    {
      id: 8,
      title: "Real-time Chat Integration",
      duration: "5:03",
      views: "967",
      thumbnail: "/placeholder-0gowo.png",
    },
  ]

  const handleVideoClick = (clipId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    const video = event.currentTarget as HTMLVideoElement

    if (video.paused) {
      video.play()
      setPlayingClips((prev) => new Set(prev).add(clipId))
    } else {
      video.pause()
      setPlayingClips((prev) => {
        const newSet = new Set(prev)
        newSet.delete(clipId)
        return newSet
      })
    }
  }

  const handleClipClick = (clip: any) => {
    if (clip.videoUrl && !playingClips.has(clip.id)) {
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
              {clip.videoUrl ? (
                <video
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 clip-vid"
                  poster={clip.thumbnail || "/placeholder.svg"}
                  preload="metadata"
                  muted
                  playsInline
                  onClick={(e) => handleVideoClick(clip.id, e)}
                >
                  <source src={clip.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={clip.thumbnail || "/placeholder.svg"}
                  alt={clip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {clip.videoUrl && !playingClips.has(clip.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-black border-y-[6px] border-y-transparent ml-1"></div>
                  </div>
                </div>
              )}

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
