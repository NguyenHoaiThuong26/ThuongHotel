"use client"
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string
  timestamp: string
  isUser: boolean
}

export function ChatMessage({ message, timestamp, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`p-3 rounded-lg max-w-[75%] text-sm leading-relaxed
        ${isUser ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"}`}
      >
        {!isUser ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        ) : (
          <span>{message}</span>
        )}

        <div className="text-xs opacity-60 mt-1 text-right">
          {timestamp}
        </div>
      </div>
    </div>
  );
}