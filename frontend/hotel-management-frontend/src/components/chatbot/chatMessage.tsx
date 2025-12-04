"use client"

interface ChatMessageProps {
  message: string
  timestamp: string
  isUser: boolean
}

export function ChatMessage({ message, timestamp, isUser }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-semibold">H</span>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-xs ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser ? "bg-teal-600 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-semibold">You</span>
        </div>
      )}
    </div>
  )
}
