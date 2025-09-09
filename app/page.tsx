"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import VideoPlayer from "@/components/video-player"
import InfoStrip from "@/components/info-strip"
import ChannelMeta from "@/components/channel-meta"
import TabsSection from "@/components/tabs-section"
import Footer from "@/components/footer"
import Toast from "@/components/toast"

export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 3000)
  }

  return (
    <div className="min-h-screen">
      <Header theme={theme} onToggleTheme={toggleTheme} onShowToast={showToast} />

      <main className="animate-fade-in">
        {/* Hero Section */}
        <section className="px-4 pt-20 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1
                className="font-heading font-bold text-[clamp(28px,4vw,48px)] leading-tight mb-4 fx-breathe animate-pulse-glow animate-char-reveal"
                data-anim="chars"
                data-text="Inside the Stream"
              >
                Inside the Stream
              </h1>
              <div className="mb-6">
                <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/5a7msMDBKDI?autoplay=1&mute=1&loop=1&playlist=5a7msMDBKDI&controls=1&modestbranding=1&rel=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="youtube-bar-container mb-6">
                <div className="youtube-bar">
                  <div className="youtube-bar-progress"></div>
                  <div className="youtube-bar-buffer"></div>
                </div>
              </div>
              <p
                className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto sub"
                data-type
                data-phrases="Minimal, immersive live video with in-stream crypto actions for $SEX.|Open X • Trade on Pump.fun • Copy $SEX CA."
                data-speed="36"
                data-erase="24"
                data-pause="1200"
                data-loop="true"
              >
                Minimal, immersive live video with in-stream crypto actions for $SEX.
              </p>
            </div>

            <VideoPlayer onShowToast={showToast} />
            <InfoStrip />
          </div>
        </section>

        {/* Channel Meta */}
        <section className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ChannelMeta onShowToast={showToast} />
          </div>
        </section>

        {/* SEX TV Chart Section */}
        <section className="sex-tvchart" id="sex-tvchart"></section>

        {/* Tabs Section */}
        <section className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <TabsSection />
          </div>
        </section>
      </main>

      <Footer />
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  )
}
