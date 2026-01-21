"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import ProfileHeader from "../../components/profile/profileHeader"
import PersonalInfoSection from "../../components/profile/profileInfo"
import ChangePasswordSection from "../../components/profile/profileChangePassword"
import BookingHistorySection from "../../components/profile/profileBookingHistory"
import { API_BASE_URL } from "../../configuration/configuration"

interface UserProfile {
  userId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  username: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        const response = await fetch(`${API_BASE_URL}/users/myInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
          return
        }

        if (response.ok) {
          const data = await response.json()
          setUserData(data.result)
        } else {
          console.error("Failed to fetch profile")
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />
      <ProfileHeader
        userName={userData ? `${userData.lastName || ''} ${userData.firstName || ''}`.trim() || userData.username : "User"}
        onLogout={handleLogout}
      />

      {/* Nội dung trang */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái - Đổi mật khẩu */}
          <div className="space-y-6">
            <ChangePasswordSection userId={userData?.userId} />
          </div>

          {/* Cột phải - Thông tin cá nhân + Lịch sử đặt phòng */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoSection initialData={userData || undefined} />
            <BookingHistorySection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
