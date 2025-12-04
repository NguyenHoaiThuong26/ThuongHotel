"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "../../components/chatbot/chatMessage"
import { ChatInput } from "../../components/chatbot/chatInput"
import { QuickReplies } from "../../components/chatbot/quickReplies"

interface Message {
  id: string
  text: string
  timestamp: string
  isUser: boolean
}

const PREDEFINED_RESPONSES: { [key: string]: string } = {
  available:
    "Chúng tôi hiện có nhiều loại phòng sang trọng đang còn trống. Bạn muốn xem danh sách phòng hay tiến hành đặt ngay?",
  booking:
    "Tôi sẵn sàng hỗ trợ bạn đặt phòng! Bạn có thể chọn ngày nhận – trả phòng và loại phòng mong muốn.",
  question:
    "Tôi luôn sẵn sàng hỗ trợ 24/7! Bạn có thể hỏi tôi về tiện nghi, loại phòng, dịch vụ, hoặc bất kỳ thông tin nào bạn cần.",
  contact: "Bạn có thể liên hệ bộ phận hỗ trợ qua email: support@hotelmanagement.com hoặc gọi số 1-800-HOTEL-NOW.",
  faq: "Một số câu hỏi thường gặp: 1) Chính sách hủy phòng? 2) Có phục vụ ăn uống tại phòng không? 3) Bao gồm những tiện nghi gì? 4) Có bãi đậu xe không?",
  default:
    "Cảm ơn bạn đã đặt câu hỏi! Tôi luôn sẵn sàng hỗ trợ thông tin về phòng, dịch vụ hoặc đặt phòng. Tôi có thể giúp gì cho bạn?",
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    if (lowerMessage.includes("phòng") || lowerMessage.includes("trống") || lowerMessage.includes("xem phòng")) {
      return PREDEFINED_RESPONSES["available"]
    } else if (
      lowerMessage.includes("đặt") ||
      lowerMessage.includes("booking") ||
      lowerMessage.includes("reservation")
    ) {
      return PREDEFINED_RESPONSES["booking"]
    } else if (lowerMessage.includes("faq") || lowerMessage.includes("câu hỏi")) {
      return PREDEFINED_RESPONSES["faq"]
    } else if (lowerMessage.includes("liên hệ") || lowerMessage.includes("hỗ trợ") || lowerMessage.includes("số điện thoại")) {
      return PREDEFINED_RESPONSES["contact"]
    }
    return PREDEFINED_RESPONSES["default"]
  }

  const handleSendMessage = (message: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    // Giả lập thời gian bot trả lời
    setTimeout(() => {
      const botResponse = getResponse(message)
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isUser: false,
      }
      setMessages(prev => [...prev, newBotMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleQuickReply = (message: string) => {
    handleSendMessage(message)
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-t-2xl md:rounded-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-4 rounded-t-2xl md:rounded-t-2xl">
        <h3 className="font-semibold text-lg">Hỗ Trợ Khách Sạn</h3>
        <p className="text-sm text-teal-100">Chúng tôi hỗ trợ 24/7</p>
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
              <span className="text-white text-sm font-semibold">H</span>
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
