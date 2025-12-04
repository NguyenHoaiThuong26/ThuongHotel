"use client"

interface QuickRepliesProps {
  onReply: (message: string) => void
}

export function QuickReplies({ onReply }: QuickRepliesProps) {
  const quickReplies = [
    { label: "Kiểm tra phòng", message: "Tôi muốn kiểm tra các phòng còn trống" },
    { label: "Đặt ngay", message: "Tôi muốn thực hiện đặt phòng" },
    { label: "FAQ", message: "Bạn có danh sách câu hỏi thường gặp không?" },
    { label: "Liên hệ", message: "Làm thế nào để tôi liên hệ bộ phận hỗ trợ?" },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {quickReplies.map((reply) => (
        <button
          key={reply.label}
          onClick={() => onReply(reply.message)}
          className="text-xs px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-teal-400 transition-colors duration-200"
        >
          {reply.label}
        </button>
      ))}
    </div>
  )
}
