"use client"

import { Users, Home, Calendar, DollarSign } from "lucide-react"
import StatCard from "./statCard"
import BookingChart from "./bookingChart"
import OccupancyChart from "./occupancyChart"

export default function DashboardOverview() {
  const stats = [
    {
      title: "Tổng số phòng",
      value: "120",
      change: "+5 trong tháng này",
      icon: Home,
      bgColor: "bg-blue-500",
    },
    {
      title: "Phòng trống",
      value: "45",
      change: "+12% so với hôm qua",
      icon: Home,
      bgColor: "bg-green-500",
    },
    {
      title: "Tổng lượt đặt phòng",
      value: "287",
      change: "+18 trong tuần này",
      icon: Calendar,
      bgColor: "bg-purple-500",
    },
    {
      title: "Doanh thu tháng này",
      value: "$124,850",
      change: "+22% so với tháng trước",
      icon: DollarSign,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Tổng số người dùng",
      value: "1,234",
      change: "+89 đăng ký mới",
      icon: Users,
      bgColor: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Tổng quan Dashboard</h1>
        <p className="text-slate-600 mt-2">Chào mừng trở lại! Đây là hiệu suất hiện tại của khách sạn.</p>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BookingChart />
        <OccupancyChart />
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {[
            { type: "Đặt phòng", message: "Đơn đặt phòng mới #BK-001234 từ John Doe", time: "2 giờ trước" },
            { type: "Phòng", message: "Phòng #105 được chuyển sang trạng thái bảo trì", time: "4 giờ trước" },
            { type: "Người dùng", message: "Quản trị viên mới đã đăng ký", time: "6 giờ trước" },
            { type: "Doanh thu", message: "Đã nhận thanh toán cho đơn #BK-001220", time: "8 giờ trước" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b border-slate-200 pb-3 last:border-0"
            >
              <div>
                <p className="font-medium text-slate-900">{activity.type}</p>
                <p className="text-sm text-slate-600">{activity.message}</p>
              </div>
              <p className="text-xs text-slate-500 whitespace-nowrap ml-4">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
