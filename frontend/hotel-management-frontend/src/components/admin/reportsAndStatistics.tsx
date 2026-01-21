"use client"

import { Download } from "lucide-react"
import RevenueChart from "./revenueChart"
import BookingTrendsChart from "./bookingTrendChart"
import OccupancyChart from "./occupancyChart"
import StarChart from "./starChart"

export default function ReportsStatistics() {
  const exportPDF = () => {
    alert("Chức năng xuất PDF sẽ được thực hiện bằng thư viện PDF như jsPDF")
  }

  const stats = [
    {
      label: "Tỷ lệ lấp đầy trung bình",
      value: "78.5%",
      trend: "+5.2% so với tháng trước",
      color: "text-blue-600",
    },
    {
      label: "Thời gian lưu trú trung bình",
      value: "3.2 ngày",
      trend: "+0.5 ngày so với tháng trước",
      color: "text-green-600",
    },
    {
      label: "Doanh thu trung bình mỗi phòng",
      value: "4,600,000 ₫",
      trend: "+12% so với tháng trước",
      color: "text-purple-600",
    },
    {
      label: "Điểm hài lòng khách hàng",
      value: "4.7/5",
      trend: "+0.2 điểm so với tháng trước",
      color: "text-yellow-600",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 500000000, target: 450000000 },
    { month: "Feb", revenue: 600000000, target: 500000000 },
    { month: "Mar", revenue: 750000000, target: 600000000 },
    { month: "Apr", revenue: 450000000, target: 500000000 },
    { month: "May", revenue: 800000000, target: 700000000 },
    { month: "Jun", revenue: 900000000, target: 800000000 },
  ]

  const occupancyData = [
    { name: "Đã thuê", value: 75 },
    { name: "Còn trống", value: 20 },
    { name: "Bảo trì", value: 5 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Báo cáo & Thống kê</h1>
          <p className="text-slate-600 mt-1">Phân tích tổng quan hiệu suất khách sạn</p>
        </div>
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Download size={20} />
          Xuất PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart data={revenueData} />
        <BookingTrendsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OccupancyChart data={occupancyData} />
        <StarChart />
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Tổng quan hiệu suất hàng tháng</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Tháng</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Đặt phòng</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Doanh thu</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Tỷ lệ lấp đầy</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Thời gian lưu trú TB</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-900">Điểm khách hàng</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: "January", bookings: 145, revenue: "700,000,000 ₫", occupancy: "72%", avgStay: "3.1", score: "4.6" },
                { month: "February", bookings: 156, revenue: "765,000,000 ₫", occupancy: "75%", avgStay: "3.2", score: "4.7" },
                { month: "March", bookings: 178, revenue: "870,000,000 ₫", occupancy: "80%", avgStay: "3.3", score: "4.8" },
                { month: "April", bookings: 192, revenue: "940,000,000 ₫", occupancy: "82%", avgStay: "3.4", score: "4.9" },
                { month: "May", bookings: 210, revenue: "1,030,000,000 ₫", occupancy: "85%", avgStay: "3.5", score: "4.9" },
                { month: "June", bookings: 225, revenue: "1,100,000,000 ₫", occupancy: "88%", avgStay: "3.6", score: "5.0" },
              ].map((row, index) => (
                <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.month}</td>
                  <td className="px-4 py-3 text-slate-700">{row.bookings}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{row.revenue}</td>
                  <td className="px-4 py-3 text-blue-600">{row.occupancy}</td>
                  <td className="px-4 py-3 text-slate-700">{row.avgStay} ngày</td>
                  <td className="px-4 py-3 text-yellow-600">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
