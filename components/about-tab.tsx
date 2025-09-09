"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

export default function AboutTab() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "How do I interact with the stream?",
      answer:
        "Hover over the video to reveal the overlay controls. You can open our X profile, visit Pump.fun, or copy the contract address directly from the video.",
    },
    {
      question: "What blockchain is this built on?",
      answer:
        "This project is built on Solana, providing fast transactions and low fees for seamless crypto interactions during the stream.",
    },
    {
      question: "Is this stream live 24/7?",
      answer:
        "We stream regularly during development hours. Follow our X account for announcements about upcoming streams and major updates.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl mb-4">About Inside The Stream</h3>
        <p className="text-[var(--color-text-muted)] leading-relaxed">
          This stream explores clean UI for crypto + creators. Tap the overlay to connect, trade, or copy the contract.
          We're building the future of interactive streaming where viewers can seamlessly engage with crypto actions
          without leaving the viewing experience.
        </p>
      </div>

      <div>
        <h4 className="font-heading font-semibold text-lg mb-4">Frequently Asked Questions</h4>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp size={16} className="text-[var(--color-text-muted)]" />
                ) : (
                  <ChevronDown size={16} className="text-[var(--color-text-muted)]" />
                )}
              </button>
              {openFAQ === index && (
                <div className="px-4 pb-3">
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
