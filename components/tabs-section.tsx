"use client"

import { useState } from "react"
import ChatTab from "./chat-tab"
import AboutTab from "./about-tab"
import ClipsTab from "./clips-tab"

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState<"chat" | "about" | "clips">("chat")

  const tabs = [
    { id: "chat" as const, label: "Chat" },
    { id: "about" as const, label: "About" },
    { id: "clips" as const, label: "Clips" },
  ]

  return (
    <div className="glass rounded-2xl overflow-hidden animate-fade-in">
      {/* Tab Headers */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "text-[var(--color-accent-cyan)] border-b-2 border-[var(--color-accent-cyan)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "chat" && <ChatTab />}
        {activeTab === "about" && <AboutTab />}
        {activeTab === "clips" && <ClipsTab />}
      </div>
    </div>
  )
}
