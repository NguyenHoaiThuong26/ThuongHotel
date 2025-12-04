"use client"

import { useState } from "react"
import { Download, CheckCircle, XCircle, Clock } from "lucide-react"

interface Booking {
  id: string
  guestName: string
  room: string
  checkIn: string
  checkOut: string
  status: "pending" | "confirmed" | "canceled"
  totalPrice: number
}

const sampleBookings: Booking[] = [
  {
    id: "BK-001234",
    guestName: "John Doe",
    room: "Deluxe Suite - R001",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    status: "confirmed",
    totalPrice: 750,
  },
  {
    id: "BK-001235",
    guestName: "Jane Smith",
    room: "Ocean View - R002",
    checkIn: "2024-01-16",
    checkOut: "2024-01-20",
    status: "pending",
    totalPrice: 720,
  },
  {
    id: "BK-001236",
    guestName: "Mike Johnson",
    room: "Garden Suite - R003",
    checkIn: "2024-01-10",
    checkOut: "2024-01-12",
    status: "canceled",
    totalPrice: 440,
  },
]

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesDate = !dateFilter || booking.checkIn === dateFilter
    return matchesSearch && matchesStatus && matchesDate
  })

  const updateBookingStatus = (id: string, newStatus: "confirmed" | "canceled") => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))
  }

  const exportCSV = () => {
    const csv = [
      ["Mã đặt phòng", "Tên khách", "Phòng", "Ngày nhận", "Ngày trả", "Trạng thái", "Tổng tiền"],
      ...filteredBookings.map((b) => [
        b.id,
        b.guestName,
        b.room,
        b.checkIn,
        b.checkOut,
        b.status,
        `$${b.totalPrice}`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bookings.csv"
    a.click()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="text-green-600" size={20} />
      case "pending":
        return <Clock className="text-yellow-600" size={20} />
      case "canceled":
        return <XCircle className="text-red-600" size={20} />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Quản lý đặt phòng</h1>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Download size={20} />
          Xuất CSV
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md">
        <div>
          <label className="text-sm font-medium text-slate-700">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tìm theo mã hoặc tên khách..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Trạng thái</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="canceled">Đã hủy</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Ngày check-in</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Kết quả</label>
          <div className="mt-1 px-3 py-2 bg-slate-50 rounded-lg text-slate-700 font-medium">
            {filteredBookings.length} lượt đặt
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Mã đặt phòng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Tên khách</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Phòng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Check-in</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Check-out</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Tổng tiền</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.guestName}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.room}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{booking.checkOut}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status === "confirmed"
                        ? "Đã xác nhận"
                        : booking.status === "pending"
                        ? "Chờ xác nhận"
                        : "Đã hủy"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    ${booking.totalPrice}
                  </td>
                  <td className="px-6 py-4 text-sm space-y-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, "confirmed")}
                          className="block w-full bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition"
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, "canceled")}
                          className="block w-full bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition"
                        >
                          Hủy
                        </button>
                      </>
                    )}
                    {booking.status !== "pending" && (
                      <button
                        disabled
                        className="block w-full bg-slate-200 text-slate-500 px-3 py-1 rounded text-xs cursor-not-allowed"
                      >
                        Không khả dụng
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Tổng số lượt đặt</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{filteredBookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            ${filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Chờ xác nhận</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {filteredBookings.filter((b) => b.status === "pending").length}
          </p>
        </div>
      </div>
    </div>
  )
}
