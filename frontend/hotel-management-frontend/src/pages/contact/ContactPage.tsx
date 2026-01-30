"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send, CheckCircle, AlertCircle } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import { Button } from "../../components/ui/button"

export default function ContactPage() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Regex kiểm tra email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Kiểm tra form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Tên là bắt buộc"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Tiêu đề là bắt buộc"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Tin nhắn là bắt buộc"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Tin nhắn phải dài ít nhất 10 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    // Mô phỏng gọi API
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitting(false)

      // Reset thông báo thành công sau 5 giây
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }, 1500)
  }

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Xóa lỗi cho trường này khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Điều hướng */}
      <Navbar />
      
      {/* Phần Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-teal-600 to-teal-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Liên hệ chúng tôi</h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto">
            Chúng tôi sẵn sàng giúp bạn lên kế hoạch cho kỳ nghỉ hoàn hảo. Liên hệ với chúng tôi bất cứ lúc nào để hỏi đáp, đặt phòng, hoặc yêu cầu đặc biệt.
          </p>
        </div>
      </section>

      {/* Thông tin liên hệ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600 mb-2">Dành cho yêu cầu và đặt phòng:</p>
              <a href="mailto:gnouht26@gmail.com" className="text-teal-600 hover:text-teal-800 font-semibold">
                gnouht26@gmail.com
              </a>
              <p className="text-slate-600 text-sm mt-4">Thời gian phản hồi: Trong vòng 2 giờ</p>
            </div>

            {/* Điện thoại */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Điện thoại</h3>
              <p className="text-slate-600 mb-2">Gọi quầy lễ tân:</p>
              <a href="tel:0938998972" className="text-teal-600 hover:text-teal-800 font-semibold">
                0938998972
              </a>
              <p className="text-slate-600 text-sm mt-4">Hoạt động 24/7</p>
            </div>

            {/* Địa chỉ */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Địa điểm</h3>
              <p className="text-slate-600 mb-2">Đến thăm chúng tôi tại:</p>
              <p className="text-teal-600 hover:text-teal-800 font-semibold">
                Phường Linh Trung
                <br />
                Thủ Đức, Thành phố Hồ Chí Minh
              </p>
              <p className="text-slate-600 text-sm mt-4">Lối vào sảnh chính</p>
            </div>
          </div>

          {/* Giờ hoạt động */}
          <div className="bg-slate-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Giờ hoạt động</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Quầy lễ tân</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>Thứ Hai - Chủ Nhật: 24/7</li>
                  <li>Giờ nhận phòng (Check-in): 14:00</li>
                  <li>Giờ trả phòng (Check-out): 12:00</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Dịch vụ khách</h4>
                <ul className="space-y-2 text-slate-600">
                  <li>Hỗ trợ khách hàng: 07:00 - 22:00</li>
                  <li>Dịch vụ phòng (Room Service): 06:00 - 22:00</li>
                  <li>Dọn phòng: 08:00 - 17:00</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mạng xã hội */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Theo dõi chúng tôi</h3>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition transform hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition transform hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition transform hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form liên hệ */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Gửi tin nhắn cho chúng tôi</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Có câu hỏi hay yêu cầu đặc biệt? Điền vào form bên dưới và chúng tôi sẽ phản hồi bạn sớm nhất có thể.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            {submitted && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Gửi tin nhắn thành công!</h3>
                  <p className="text-green-700 text-sm">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 2 giờ.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trường tên */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.name ? "border-red-500 bg-red-50" : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                />
                {errors.name && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Trường email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Địa chỉ Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.email ? "border-red-500 bg-red-50" : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                />
                {errors.email && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Trường tiêu đề */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Yêu cầu đặt phòng"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.subject ? "border-red-500 bg-red-50" : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                />
                {errors.subject && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </div>
                )}
              </div>

              {/* Trường tin nhắn */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Tin nhắn <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Vui lòng cho chúng tôi biết cách chúng tôi có thể giúp bạn..."
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none ${
                    errors.message ? "border-red-500 bg-red-50" : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                />
                {errors.message && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </div>
                )}
              </div>

              {/* Nút gửi */}
              <div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed py-3 text-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Gửi tin nhắn
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4">Vị trí của chúng tôi</h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
            Tìm chúng tôi trên bản đồ hoặc dùng nút chỉ đường để đến khách sạn.
          </p>

          <div className="rounded-lg overflow-hidden shadow-lg h-96 md:h-96">
            <iframe
              title="Vị trí khách sạn"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.21452551595!2d106.78918677451836!3d10.871281657438018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRQLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1769538013626!5m2!1svi!2s"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://maps.google.com/?q=123+Luxury+Avenue,+Paradise+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-teal-600 hover:bg-teal-700">Chỉ đường</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
