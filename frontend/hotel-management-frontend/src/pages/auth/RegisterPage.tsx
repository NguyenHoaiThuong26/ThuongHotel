import React, { useState } from "react"
import {
  Eye,
  EyeOff,
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  Loader2,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) newErrors.username = "Tên đăng nhập là bắt buộc"
    if (!formData.email.trim()) newErrors.email = "Email là bắt buộc"
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ"
    if (!formData.password.trim()) newErrors.password = "Mật khẩu là bắt buộc"
    else if (formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    if (!formData.phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc"
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Ngày sinh là bắt buộc"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Đăng ký thành công:", data)
      } else {
        setErrors({ email: "Đăng ký thất bại. Vui lòng thử lại." })
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error)
      setErrors({ email: "Đã xảy ra lỗi. Vui lòng thử lại." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Bên trái */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-teal-400 to-blue-500">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(/placeholder.svg?height=1080&width=960&query=luxury%20hotel%20interior)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/80 to-blue-500/60" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-8 text-white">
          <div className="text-center max-w-md">
            <Building2 className="w-16 h-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl font-bold mb-4">Tham gia Thuong Hotel</h1>
            <p className="text-white text-lg leading-relaxed">
              Tạo tài khoản để quản lý đặt phòng và tận hưởng các dịch vụ cao cấp.
            </p>
          </div>
        </div>
      </div>

      {/* Bên phải */}
      <div className="w-full lg:w-1/2 flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo trên mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <Building2 className="w-12 h-12 text-teal-600" />
          </div>

          {/* Tiêu đề form */}
          <div className="mb-8 text-left">
            <h2 className="text-3xl font-bold text-slate-900">Tạo tài khoản</h2>
            <p className="text-slate-600 mt-2">
              Điền thông tin để bắt đầu
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="john_doe"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.username
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="0123456789"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.phone
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Ngày sinh
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.dateOfBirth
                      ? "border-red-500 bg-red-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Nút đăng ký */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:brightness-105 disabled:bg-teal-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          {/* Chuyển sang đăng nhập */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-teal-600 hover:text-teal-700 font-semibold transition"
              >
                Đăng nhập tại đây
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
            <p>© 2025 Thuong Hotel. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
