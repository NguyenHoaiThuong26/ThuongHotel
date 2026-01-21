"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardOverview from "../../components/admin/dashboardOverview"
import AdminSidebar from "../../components/admin/adminSidebar"
import RoomManagement from "../../components/admin/roomManagement"
import BookingManagement from "../../components/admin/bookingManagement"
import UserManagement from "../../components/admin/userManagement"

import AdminProfile from "../../components/admin/adminProfile"
import RoomTypeManagement from "../../components/admin/roomTypeManagement"

import CheckInScanner from "../../pages/admin/CheckInScanner"
import { getUserRoles, hasRoleSync } from "../../utils/auth"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState("overview")
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthAndRole = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        navigate("/login")
        return
      }

      const roles = await getUserRoles()
      if (roles.length === 0 || (!hasRoleSync(roles, "ADMIN") && !hasRoleSync(roles, "STAFF") && !hasRoleSync(roles, "RECEPTIONIST"))) {
        navigate("/")
        return
      }

      setUserRoles(roles)

      // Default section for non-admin roles
      if (!hasRoleSync(roles, "ADMIN")) {
        setCurrentSection("bookings")
        if (hasRoleSync(roles, "RECEPTIONIST")) {
          setCurrentSection("checkin")
        }
      }

      setIsLoading(false)
    }

    checkAuthAndRole()
  }, [navigate])

  const renderSection = () => {
    const isStaffOnly = hasRoleSync(userRoles, "STAFF") && !hasRoleSync(userRoles, "ADMIN")
    const isReceptionist = hasRoleSync(userRoles, "RECEPTIONIST") && !hasRoleSync(userRoles, "ADMIN")

    if (isStaffOnly) {
      switch (currentSection) {
        case "rooms":
          return <RoomManagement userRoles={userRoles} />
        case "bookings":
          return <BookingManagement />
        default:
          return <BookingManagement />
      }
    }

    if (isReceptionist) {
      switch (currentSection) {
        case "rooms":
          return <RoomManagement userRoles={userRoles} />
        case "bookings":
          return <BookingManagement />
        case "checkin":
          return <CheckInScanner />
        case "profile":
          return <AdminProfile />
        default:
          return <CheckInScanner />
      }
    }

    switch (currentSection) {
      case "overview":
        return <DashboardOverview />
      case "room-types":
        return <RoomTypeManagement />
      case "rooms":
        return <RoomManagement userRoles={userRoles} />
      case "bookings":
        return <BookingManagement />
      case "users":
        return <UserManagement />
      case "profile":
        return <AdminProfile />
      case "checkin":
        return <CheckInScanner />
      default:
        return <DashboardOverview />
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-slate-50 items-center justify-center">
        <div className="text-slate-600">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar currentSection={currentSection} onSectionChange={setCurrentSection} userRoles={userRoles} />
      <main className="flex-1 overflow-auto md:ml-0">
        <div className="p-4 md:p-8">{renderSection()}</div>
      </main>
    </div>
  )
}
