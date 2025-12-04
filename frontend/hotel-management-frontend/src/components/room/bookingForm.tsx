"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { AlertCircle } from "lucide-react"

interface BookingFormProps {
  roomId: number
  pricePerNight: number
  onSubmit: (formData: BookingFormData) => void
  isLoading: boolean
}

export interface BookingFormData {
  fullName: string
  email: string
  phone: string
  checkInDate: string
  checkOutDate: string
  numGuests: number
  specialRequests: string
}

export default function BookingForm({ roomId, pricePerNight, onSubmit, isLoading }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    numGuests: 1,
    specialRequests: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Họ và tên là bắt buộc"
    if (!formData.email.trim()) newErrors.email = "Email là bắt buộc"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Định dạng email không hợp lệ"
    if (!formData.phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc"
    if (!formData.checkInDate) newErrors.checkInDate = "Ngày nhận phòng là bắt buộc"
    if (!formData.checkOutDate) newErrors.checkOutDate = "Ngày trả phòng là bắt buộc"
    if (formData.checkOutDate && formData.checkInDate && formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = "Ngày trả phòng phải sau ngày nhận phòng"
    }
    if (formData.numGuests < 1) newErrors.numGuests = "Ít nhất 1 khách là bắt buộc"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numGuests" ? Number.parseInt(value) : value,
    }))
    // Xóa lỗi của trường khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Tính số đêm
  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0
    const checkIn = new Date(formData.checkInDate)
    const checkOut = new Date(formData.checkOutDate)
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights * pricePerNight

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Thông tin cá nhân */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Thông tin cá nhân</h3>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
              errors.fullName ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.fullName && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.fullName}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
              errors.email ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.email && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+84 912 345 678"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
              errors.phone ? "border-red-500" : "border-slate-300"
            }`}
          />
          {errors.phone && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </div>
          )}
        </div>
      </div>

      {/* Chi tiết đặt phòng */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Chi tiết đặt phòng</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Ngày nhận phòng</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                errors.checkInDate ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.checkInDate && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.checkInDate}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Ngày trả phòng</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                errors.checkOutDate ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.checkOutDate && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.checkOutDate}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Số lượng khách</label>
          <select
            name="numGuests"
            value={formData.numGuests}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
              errors.numGuests ? "border-red-500" : "border-slate-300"
            }`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} khách{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          {errors.numGuests && (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.numGuests}
            </div>
          )}
        </div>
      </div>

      {/* Yêu cầu đặc biệt */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Yêu cầu đặc biệt</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú thêm</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Có yêu cầu đặc biệt hoặc lưu ý gì không? (Tùy chọn)"
            rows={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
          />
        </div>
      </div>

      {/* Tóm tắt giá */}
      {nights > 0 && (
        <div className="pt-6 border-t border-slate-200 bg-slate-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              {nights} đêm × ${pricePerNight}/đêm
            </span>
            <span className="font-semibold text-slate-900">${nights * pricePerNight}</span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between">
            <span className="font-semibold text-slate-900">Tổng tiền</span>
            <span className="text-2xl font-bold text-teal-600">${totalPrice}</span>
          </div>
        </div>
      )}

      {/* Nút xác nhận */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-md hover:brightness-105 h-12 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Đang xử lý..." : "Xác nhận đặt phòng"}
      </Button>

    </form>
  )
}
