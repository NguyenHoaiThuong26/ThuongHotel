import React, { useState } from "react"
import { Eye, EyeOff, Building2, Mail, Lock, Loader2 } from "lucide-react"
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) newErrors.email = "Email hoặc tên đăng nhập là bắt buộc"
    if (!password.trim()) newErrors.password = "Mật khẩu là bắt buộc"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Đăng nhập thành công:", data)
      } else {
        setErrors({ email: "Thông tin đăng nhập không hợp lệ" })
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error)
      setErrors({ email: "Đã xảy ra lỗi. Vui lòng thử lại." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Đăng nhập Google được nhấn")
  }

  const handleFacebookLogin = () => {
  console.log("Đăng nhập Facebook được nhấn")
  
}


  return (
    <div className="min-h-screen flex">
      {/* Bên trái */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden 
                  bg-gradient-to-br from-teal-400 to-blue-500">
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
            <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Thuong Hotel</h1>
            <p className="text-white text-lg leading-relaxed">
              Trải nghiệm dịch vụ khách sạn đẳng cấp thế giới. Quản lý đặt phòng của bạn dễ dàng.
            </p>
          </div>
        </div>
      </div>

      {/* Bên phải */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white pt-10">
        <div className="w-full max-w-md">
          {/* Logo trên mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <Building2 className="w-12 h-12 text-teal-600" />
          </div>

          {/* Tiêu đề form */}
          <div className="mb-8 text-left">
            <h2 className="text-3xl font-bold text-slate-900">Đăng nhập</h2>
            <p className="text-slate-600 mt-2">Nhập thông tin của bạn để truy cập tài khoản</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Email hoặc tên đăng nhập
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: undefined })
                  }}
                  placeholder="your@email.com"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.email ? "border-red-500 bg-red-50" : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Mật khẩu */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2 text-left">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: undefined })
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
                    errors.password ? "border-red-500 bg-red-50" : "border-slate-300 bg-slate-50 hover:border-slate-400"
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
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:brightness-105 disabled:bg-teal-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Hoặc tiếp tục với</span>
              </div>
            </div>

            {/* Đăng nhập Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Đăng nhập với Google
            </button>

            {/* Đăng nhập Facebook */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.62 3.5-3.62.7 0 1.45.12 2.14.25v2.36h-1.2c-1.18 0-1.55.74-1.55 1.49v1.78h2.64l-.42 2.9h-2.22v7.03C18.34 21.2 22 17.07 22 12.07z"
                />
              </svg>
              Đăng nhập với Facebook
            </button>

            <button
  type="button"
  className="w-full border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-3"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M3 3h8v8H3V3m2 2v4h4V5H5M3 13h8v8H3v-8m2 2v4h4v-4H5M13 3h8v8h-8V3m2 2v4h4V5h-4M15 13h2v2h-2v-2m4 0h2v2h-2v-2m-4 4h2v2h-2v-2m4 0h2v2h-2v-2Z" />
  </svg>
  Đăng nhập bằng QR
</button>


          </form>

          {/* Chuyển sang đăng ký */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-teal-600 hover:text-teal-700 font-semibold transition">
                Đăng ký ngay
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
