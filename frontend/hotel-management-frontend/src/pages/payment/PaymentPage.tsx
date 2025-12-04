"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import BookingSummary from "../../components/room/bookingSummary"

export default function PaymentPage() {
  const { id } = useParams()
  const roomId = Number(id)
  const navigate = useNavigate()

  const [paymentData, setPaymentData] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("bookingData")
    if (!data) {
      navigate(`/booking/${roomId}`)
      return
    }
    const parsedData = JSON.parse(data)
    if (parsedData.room.id !== roomId) {
      navigate(`/booking/${roomId}`)
      return
    }
    setPaymentData(parsedData)
  }, [roomId, navigate])

  if (!paymentData) {
    return <div className="w-full min-h-screen flex items-center justify-center text-slate-700">Đang tải...</div>
  }

  const { formData, room, nights, totalPrice } = paymentData

  const handleVnpayPayment = async () => {
    setIsProcessing(true)

    try {
      // Gọi backend để tạo URL thanh toán VNPAY
      const response = await fetch("/api/payment/vnpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          orderId: room.id,
          orderInfo: `Đặt phòng ${room.name}`,
          bankCode: "NCB", // Có thể thay đổi theo nhu cầu
        }),
      })

      const data = await response.json()
      if (data.paymentUrl) {
        // Chuyển hướng sang VNPAY
        window.location.href = data.paymentUrl
      } else {
        alert("Không thể tạo URL thanh toán VNPAY")
      }
    } catch (err) {
      console.error(err)
      alert("Lỗi kết nối server")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />

      <section className="py-12 md:py-16 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Thanh toán</h1>
          <p className="text-lg text-slate-600 mb-12">
            Hoàn tất thanh toán để xác nhận đặt phòng <strong>{room.name}</strong>
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Form thanh toán */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Họ và tên</label>
                    <input type="text" value={formData.fullName} readOnly
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input type="email" value={formData.email} readOnly
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Số điện thoại</label>
                    <input type="text" value={formData.phone} readOnly
                      className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-100" />
                  </div>

                  <div className="pt-4">
                    <p className="text-lg font-medium text-slate-900">
                      Số đêm: {nights} <br />
                      Tổng giá: ${totalPrice}
                    </p>
                  </div>

                  {/* Nút Back + Pay */}
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <button
                        onClick={() => navigate(`/booking/${room.id}`)}
                        className="flex-1 h-12 border border-teal-500 text-teal-500 bg-transparent hover:bg-teal-50 font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        Quay lại đặt phòng
                    </button>

                    <button
                        onClick={handleVnpayPayment}
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-md hover:brightness-105 h-12 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? "Đang xử lý..." : "Thanh toán với VNPAY"}
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* Tóm tắt phòng */}
            <div>
              <BookingSummary room={room} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
