"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "../../components/chatbot/chatMessage"
import { ChatInput } from "../../components/chatbot/chatInput"
import { QuickReplies } from "../../components/chatbot/quickReplies"
import { API_BASE_URL } from "../../configuration/configuration"

// OpenRouter config from environment variables
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_MODEL = "openai/gpt-3.5-turbo"; // Or any other model supported by OpenRouter

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

  const callOpenRouter = async (userMessage: string) => {
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.includes("YOUR_OPENROUTER_API_KEY_HERE")) {
      // Fallback if no key
      return "Xin lỗi, tôi chưa được cấu hình API Key để trả lời thông minh. Vui lòng liên hệ admin.";
    }

    try {
      const systemPrompt = `
You are a helpful and polite hotel receptionist AI. 
Here is the current list of rooms and their details, prices, and status in JSON format:
${roomContext}

When answering:
1. Use Vietnamese language.
2. Be professional and welcoming.
3. Use the provided room data to answer questions about availability, price, amenities, etc.
4. Always use VND (Vietnamese Dong) for currency.
4. If the user asks to book, guide them to use the booking button on the room list.
5. If the user asks about something not in the data, try to be helpful or ask them to contact support.
`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin, // Required by OpenRouter
          "X-Title": "Hotel Management AI" // Optional
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        console.error("OpenRouter Error:", data);
        return "Xin lỗi, tôi đang gặp sự cố khi suy nghĩ. Vui lòng thử lại sau.";
      }

    } catch (error) {
      console.error("AI Call Failed", error);
      return "Xin lỗi, kết nối đến bộ não AI bị gián đoạn.";
    }
  }

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
    const aiResponse = await callOpenRouter(message);

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
