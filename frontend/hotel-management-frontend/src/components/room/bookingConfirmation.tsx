import { Link } from 'react-router-dom'
import { Button } from "../../components/ui/button"
import { CheckCircle2, Home, Calendar } from "lucide-react"
import type { BookingFormData } from "./bookingForm"

interface BookingConfirmationModalProps {
  isOpen: boolean
  bookingData: {
    formData: BookingFormData
    roomName: string
    pricePerNight: number
    nights: number
    totalPrice: number
  } | null
}

export default function BookingConfirmationModal({ isOpen, bookingData }: BookingConfirmationModalProps) {
  if (!isOpen || !bookingData) return null

  const checkInDate = new Date(bookingData.formData.checkInDate).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const checkOutDate = new Date(bookingData.formData.checkOutDate).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-50 to-slate-50 p-8 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-serif font-bold text-slate-900">Đặt phòng thành công!</h2>
          </div>
          <p className="text-slate-600">Đặt phòng của bạn đã được xử lý thành công.</p>
        </div>

        {/* Nội dung */}
        <div className="p-8 space-y-8">
          {/* Thông báo xác nhận */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              Một email xác nhận đã được gửi đến <strong>{bookingData.formData.email}</strong>
            </p>
          </div>

          {/* Chi tiết đặt phòng */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-slate-900">Chi tiết đặt phòng</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Thông tin khách */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Thông tin khách</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-600">Họ và tên</p>
                    <p className="font-medium text-slate-900">{bookingData.formData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{bookingData.formData.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Số điện thoại</p>
                    <p className="font-medium text-slate-900">{bookingData.formData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Phòng & Ngày */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Phòng & Ngày</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-600">Phòng</p>
                    <p className="font-medium text-slate-900">{bookingData.roomName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="text-slate-600">Ngày nhận phòng</p>
                      <p className="font-medium text-slate-900">{checkInDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <div>
                      <p className="text-slate-600">Ngày trả phòng</p>
                      <p className="font-medium text-slate-900">{checkOutDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tóm tắt đặt phòng */}
            <div className="bg-slate-50 rounded-lg p-6 space-y-3">
              <h4 className="font-semibold text-slate-900">Tóm tắt đặt phòng</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    {bookingData.nights} đêm × ${bookingData.pricePerNight}/đêm
                  </span>
                  <span className="font-medium text-slate-900">${bookingData.nights * bookingData.pricePerNight}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Số khách</span>
                  <span className="font-medium text-slate-900">{bookingData.formData.numGuests}</span>
                </div>
                {bookingData.formData.specialRequests && (
                  <div className="border-t border-slate-200 pt-2">
                    <p className="text-slate-600">Yêu cầu đặc biệt</p>
                    <p className="font-medium text-slate-900 mt-1">{bookingData.formData.specialRequests}</p>
                  </div>
                )}
              </div>

              {/* Tổng giá */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Tổng giá</span>
                  <span className="text-2xl font-bold text-teal-600">${bookingData.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Các bước tiếp theo */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-teal-900">Các bước tiếp theo</h4>
              <ul className="text-sm text-teal-900 space-y-1">
                <li>• Một email xác nhận sẽ được gửi trong vài phút</li>
                <li>• Nhận phòng từ 3:00 chiều</li>
                <li>• Trả phòng trước 11:00 sáng</li>
                <li>• Mọi thắc mắc, liên hệ lễ tân</li>
              </ul>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Link to="/" className="flex-1">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 h-12 rounded-xl flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Quay về Trang Chủ
              </Button>
            </Link>
            <Link to="/rooms" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-teal-500 text-teal-500 hover:bg-teal-50 bg-transparent"
              >
                Xem thêm phòng
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
