"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

interface RoomStatusModalProps {
  roomId: string
  currentStatus: string
  onClose: () => void
  onSuccess: () => void
}

export default function RoomStatusModal({ roomId, currentStatus, onClose, onSuccess }: RoomStatusModalProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (status === currentStatus) {
      onClose()
      return
    }

    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/status?status=${status}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        toast.error("Phiên đăng nhập hết hạn")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      if (response.ok) {
        toast.success("Cập nhật trạng thái thành công")
        onSuccess()
        onClose()
      } else {
        const data = await response.json()
        toast.error(data.message || "Cập nhật thất bại")
      }
    } catch (error) {
      console.error("Error updating room status", error)
      toast.error("Lỗi kết nối")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-slate-900">
            Cập nhật trạng thái phòng
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Trạng thái
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="AVAILABLE">Có sẵn</option>
              <option value="OCCUPIED">Đang sử dụng</option>
              <option value="CLEANING">Đang dọn dẹp</option>
              <option value="MAINTENANCE">Bảo trì</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-medium disabled:bg-teal-400"
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-slate-200 text-slate-900 py-2 rounded-lg hover:bg-slate-300 transition font-medium disabled:bg-slate-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
