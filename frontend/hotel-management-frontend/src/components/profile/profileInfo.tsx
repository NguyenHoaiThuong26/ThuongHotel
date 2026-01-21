"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Edit2, Save, X } from "lucide-react"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"

interface PersonalInfoSectionProps {
  initialData?: {
    userId?: string
    username?: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
}

export default function PersonalInfoSection({
  initialData = {
    userId: "",
    username: "",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
  },
}: PersonalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  // Sync state when initialData changes (e.g. after API fetch)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const [formData, setFormData] = useState(initialData)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!formData.userId) {
      toast.error("Không tìm thấy ID người dùng")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/users/${formData.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          // Only send fields that exist in UserUpdateRequest, exclude userId, username (usually immutable)
          // Also password and roles are omitted so backend ignores them (as per my backend fix)
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setIsEditing(false)
        toast.success("Cập nhật thông tin thành công!")
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        toast.error("Cập nhật thất bại. Vui lòng thử lại.")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Đã xảy ra lỗi khi lưu thông tin.")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={18} />
              <span>Lưu</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setFormData(initialData)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              <X size={18} />
              <span>Hủy</span>
            </button>
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Cập nhật thông tin thành công!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Họ</label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 font-medium">{formData.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 font-medium">{formData.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
          <input
            type="text"
            value={formData.username || ""}
            readOnly
            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 font-medium">{formData.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-900 font-medium">{formData.address}</p>
          )}
        </div>
      </div>
    </div>
  )
}
