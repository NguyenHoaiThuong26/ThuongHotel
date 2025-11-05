"use client"

import { useState } from "react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import ProfileHeader from "../../components/profile/profileHeader"
import PersonalInfoSection from "../../components/profile/profileInfo"
import ChangePasswordSection from "../../components/profile/profileChangePassword"
import BookingHistorySection from "../../components/profile/profileBookingHistory"

export default function ProfilePage() {
  const [userName] = useState("John Doe")

  const handleLogout = () => {
    console.log("User logged out")
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <ProfileHeader 
        userName={userName} 
        onLogout={handleLogout} 
      />

      {/* Nội dung trang */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái - Đổi mật khẩu */}
          <div className="space-y-6">
            <ChangePasswordSection />
          </div>

          {/* Cột phải - Thông tin cá nhân + Lịch sử đặt phòng */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoSection />
            <BookingHistorySection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
