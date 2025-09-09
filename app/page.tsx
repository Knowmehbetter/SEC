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
                    id="youtube-player"
                    src="https://www.youtube-nocookie.com/embed/5a7msMDBKDI?autoplay=1&mute=1&loop=1&playlist=5a7msMDBKDI&controls=1&modestbranding=1&rel=0&enablejsapi=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="youtube-bar-container mb-6">
                <div id="youtube-progress-bar" className="youtube-bar">
                  <div id="youtube-progress" className="youtube-bar-progress"></div>
                  <div id="youtube-buffer" className="youtube-bar-buffer"></div>
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
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // YouTube IFrame API integration for functional progress bar
            let player;
            let progressUpdateInterval;

            function onYouTubeIframeAPIReady() {
              console.log('[v0] YouTube API ready, initializing player');
              player = new YT.Player('youtube-player', {
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
              });
            }

            function onPlayerReady(event) {
              console.log('[v0] YouTube player ready');
              startProgressUpdates();
            }

            function onPlayerStateChange(event) {
              if (event.data == YT.PlayerState.PLAYING) {
                startProgressUpdates();
              } else {
                stopProgressUpdates();
              }
            }

            function startProgressUpdates() {
              if (progressUpdateInterval) clearInterval(progressUpdateInterval);
              
              progressUpdateInterval = setInterval(() => {
                if (player && player.getCurrentTime && player.getDuration) {
                  const currentTime = player.getCurrentTime();
                  const duration = player.getDuration();
                  const buffered = player.getVideoLoadedFraction();
                  
                  if (duration > 0) {
                    const progressPercent = (currentTime / duration) * 100;
                    const bufferedPercent = buffered * 100;
                    
                    const progressBar = document.getElementById('youtube-progress');
                    const bufferBar = document.getElementById('youtube-buffer');
                    
                    if (progressBar) progressBar.style.width = progressPercent + '%';
                    if (bufferBar) bufferBar.style.width = bufferedPercent + '%';
                  }
                }
              }, 100);
            }

            function stopProgressUpdates() {
              if (progressUpdateInterval) {
                clearInterval(progressUpdateInterval);
                progressUpdateInterval = null;
              }
            }

            // Progress bar click to seek
            document.addEventListener('DOMContentLoaded', () => {
              const progressContainer = document.getElementById('youtube-progress-bar');
              if (progressContainer) {
                progressContainer.addEventListener('click', (e) => {
                  if (player && player.getDuration) {
                    const rect = progressContainer.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = clickX / rect.width;
                    const seekTime = percentage * player.getDuration();
                    player.seekTo(seekTime);
                  }
                });
              }
            });

            // Fallback if API doesn't load
            window.addEventListener('load', () => {
              setTimeout(() => {
                if (typeof YT === 'undefined') {
                  console.log('[v0] YouTube API not loaded, keeping decorative progress bar');
                }
              }, 3000);
            });
          `,
        }}
      />
    </div>
  )
}
