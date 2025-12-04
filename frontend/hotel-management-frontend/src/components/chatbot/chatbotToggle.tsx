
"use client"

import { useState } from "react"
import { ChatbotPanel } from "../../components/chatbot/chatbotPanel"

export function ChatbotToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Toggle Button */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center"
  aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
>
  {isOpen ? (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )}
</button>


      {/* Chat Panel - Mobile (bottom sheet) */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 max-h-[80vh]">
          <div className="bg-gray-50 max-h-[80vh] rounded-t-2xl shadow-2xl flex flex-col">
            <ChatbotPanel />
          </div>
        </div>
      )}

      {/* Chat Panel - Desktop (fixed panel) */}
      {isOpen && (
        <div
          className="hidden md:flex fixed bottom-24 right-6 w-96 h-[500px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl z-40 flex-col border border-gray-200 overflow-hidden"
        >
          <ChatbotPanel />
        </div>

      )}
    </>
  )
}
 