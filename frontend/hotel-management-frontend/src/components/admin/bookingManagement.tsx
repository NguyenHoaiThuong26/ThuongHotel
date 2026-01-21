"use client"

import { useState, useEffect } from "react"
import { Download, CheckCircle, XCircle, Clock, Search, Filter } from "lucide-react"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"

interface Booking {
  bookingId: string
  guestName: string
  roomNumber: string
  roomName: string
  checkIn: string
  checkOut: string
  status: string
  totalPrice: number
  createdAt: string
}

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setBookings(data.result || [])
      } else {
        toast.error("Không thể tải danh sách đặt phòng")
      }
    } catch (error) {
      console.error("Error fetching bookings", error)
      toast.error("Lỗi kết nối")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.guestName && booking.guestName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    // Simple date comparison (booking has full timestamp, filter is YYYY-MM-DD)
    const matchesDate = !dateFilter || booking.checkIn.startsWith(dateFilter)

    return matchesSearch && matchesStatus && matchesDate
  })

  const cancelBooking = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn hủy đặt phòng này không?")) return

    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/cancel/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        toast.success("Đã hủy đặt phòng thành công")
        fetchBookings() // Refresh
      } else {
        toast.error("Không thể hủy đặt phòng")
      }
    } catch (error) {
      console.error("Error cancelling booking", error)
      toast.error("Lỗi kết nối")
    }
  }

  const exportCSV = () => {
    const csv = [
      ["Mã đặt phòng", "Tên khách", "Phòng", "Ngày nhận", "Ngày trả", "Trạng thái", "Tổng tiền"],
      ...filteredBookings.map((b) => [
        b.bookingId,
        b.guestName || "N/A",
        `P${b.roomNumber}`,
        new Date(b.checkIn).toLocaleDateString(),
        new Date(b.checkOut).toLocaleDateString(),
        b.status,
        `${b.totalPrice}`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `bookings_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const approveBooking = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/approve/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        toast.success("Đã duyệt đặt phòng thành công")
        fetchBookings() // Refresh
      } else {
        toast.error("Không thể duyệt đặt phòng")
      }
    } catch (error) {
      console.error("Error approving booking", error)
      toast.error("Lỗi kết nối")
    }
  }

  const handleCheckIn = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/check-in/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        toast.success("Check-in thành công")
        fetchBookings() // Refresh
      } else {
        toast.error("Không thể Check-in")
      }
    } catch (error) {
      console.error("Error check-in", error)
      toast.error("Lỗi kết nối")
    }
  }

  const handleCheckOut = async (id: string) => {
    if (!confirm("Xác nhận Check-out và thanh toán?")) return

    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/check-out/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        toast.success("Check-out thành công")
        fetchBookings() // Refresh
      } else {
        toast.error("Không thể Check-out")
      }
    } catch (error) {
      console.error("Error check-out", error)
      toast.error("Lỗi kết nối")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CHECKED_IN":
      case "OCCUPIED":
        return <CheckCircle className="text-green-600" size={18} />
      case "COMPLETED":
        return <CheckCircle className="text-purple-600" size={18} />
      case "BOOKED":
        return <Clock className="text-blue-600" size={18} />
      case "PENDING":
        return <Clock className="text-yellow-600" size={18} />
      case "CANCELLED":
        return <XCircle className="text-red-600" size={18} />
      default:
        return <Clock className="text-gray-600" size={18} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CHECKED_IN":
      case "OCCUPIED":
        return "bg-green-100 text-green-800"
      case "COMPLETED":
        return "bg-purple-100 text-purple-800"
      case "BOOKED":
        return "bg-blue-100 text-blue-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý đặt phòng</h1>
          <p className="text-slate-500 text-sm">Xem và quản lý tất cả các lượt đặt phòng</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition w-fit"
        >
          <Download size={18} />
          Xuất dữ liệu
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase text-slate-500 mb-1 block">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm mã, khách hàng, số phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500 mb-1 block">Trạng thái</label>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm appearance-none bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="PENDING">Chờ duyệt (Pending)</option>
              <option value="BOOKED">Đã đặt (Booked)</option>
              <option value="CHECKED_IN">Đã check-in</option>
              <option value="COMPLETED">Đã hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500 mb-1 block">Ngày check-in</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs text-slate-500 font-semibold uppercase">Tổng lượt đặt</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{filteredBookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs text-slate-500 font-semibold uppercase">Doanh thu dự kiến</p>
          <p className="text-2xl font-bold text-teal-600 mt-1">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              filteredBookings.reduce((sum, b) => b.status !== 'CANCELLED' ? sum + b.totalPrice : sum, 0)
            )}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs text-slate-500 font-semibold uppercase">Đang hoạt động</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {filteredBookings.filter(b => b.status === 'BOOKED' || b.status === 'CHECKED_IN').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs text-slate-500 font-semibold uppercase">Chờ duyệt</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {filteredBookings.filter(b => b.status === 'PENDING').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12">Đang tải dữ liệu...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 text-slate-500">Không tìm thấy dữ liệu</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mã đặt phòng</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Phòng</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng tiền</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {booking.bookingId.substring(0, 8)}...
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{booking.guestName || "Khách vãng lai"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900 font-semibold">P{booking.roomNumber}</div>
                      {booking.roomName && <div className="text-xs text-slate-500">{booking.roomName}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{new Date(booking.checkIn).toLocaleDateString()}</div>
                      <div className="text-xs text-slate-500">to {new Date(booking.checkOut).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.totalPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        {booking.status === "PENDING" && (
                          <button
                            onClick={() => approveBooking(booking.bookingId)}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs px-3 py-1.5 rounded transition shadow-sm"
                          >
                            Duyệt
                          </button>
                        )}
                        {booking.status === "BOOKED" && (
                          <button
                            onClick={() => handleCheckIn(booking.bookingId)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-3 py-1.5 rounded transition shadow-sm"
                          >
                            Check-in
                          </button>
                        )}
                        {booking.status === "CHECKED_IN" && (
                          <button
                            onClick={() => handleCheckOut(booking.bookingId)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs px-3 py-1.5 rounded transition shadow-sm"
                          >
                            Check-out
                          </button>
                        )}
                        {(booking.status === "BOOKED" || booking.status === "PENDING") && (
                          <button
                            onClick={() => cancelBooking(booking.bookingId)}
                            className="bg-white border border-red-200 text-red-600 hover:bg-red-50 font-medium text-xs px-3 py-1.5 rounded transition"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
