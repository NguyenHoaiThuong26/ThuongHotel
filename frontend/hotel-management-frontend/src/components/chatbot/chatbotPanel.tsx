"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "../../components/chatbot/chatMessage"
import { ChatInput } from "../../components/chatbot/chatInput"
import { QuickReplies } from "../../components/chatbot/quickReplies"
import { API_BASE_URL } from "../../configuration/configuration"

interface Message {
  id: string
  text: string
  timestamp: string
  isUser: boolean
}

export function ChatbotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Chào mừng bạn đến với khách sạn của chúng tôi. Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn hôm nay?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: false,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Store room context data
  const [roomContext, setRoomContext] = useState<string>("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch Room Data for AI Context
  useEffect(() => {
    const fetchRoomsForContext = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/rooms`)
        if (response.ok) {
          const data = await response.json()
          const rooms = data.result || []
          // Simplify data for AI context
          const simplifiedRooms = rooms.map((r: any) => ({
            name: r.roomNumber,
            type: r.roomTypeName,
            price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(r.price),
            status: r.status,
            capacity: `${r.maxAdults} Adults, ${r.maxChildren} Children`,
            amenities: r.amenities
          }))
          setRoomContext(JSON.stringify(simplifiedRooms))
        }
      } catch (error) {
        console.error("Failed to fetch room context for AI", error)
      }
    }

    fetchRoomsForContext()
  }, [])

const callBackendAI = async (userMessage: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        roomContext: roomContext
      })
    });

    const data = await response.json();

    console.log("AI response:", data);

    if (data.code === 0) {
      return data.result.reply; // lấy reply
    } else {
      return "Xin lỗi, AI không thể trả lời lúc này.";
    }

  } catch (error) {
    console.error("Backend AI error:", error);
    return "Xin lỗi, kết nối đến AI bị gián đoạn.";
  }
};


  const handleSendMessage = async (message: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    // Call AI
    const aiResponse = await callBackendAI(message);

    const newBotMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: false,
    }

    setMessages(prev => [...prev, newBotMessage])
    setIsLoading(false)
  }

  const handleQuickReply = (message: string) => {
    handleSendMessage(message)
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-t-2xl md:rounded-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-4 rounded-t-2xl md:rounded-t-2xl">
        <h3 className="font-semibold text-lg">Hỗ Trợ Khách Sạn</h3>
        <p className="text-sm text-teal-100">AI Support (OpenRouter)</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message.text}
            timestamp={message.timestamp}
            isUser={message.isUser}
          />
        ))}

        {isLoading && (
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">AI</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* QuickReplies + Input */}
      <div className="px-4 pb-4 space-y-2">
        {messages.length <= 2 && <QuickReplies onReply={handleQuickReply} />}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
