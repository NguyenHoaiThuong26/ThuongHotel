"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Loader2 } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import RoomCard from "../../components/room/roomCard"
import { API_BASE_URL } from "../../configuration/configuration"
import type { RoomCardProps } from "../../components/room/roomCard"
import toast from "react-hot-toast"

import { useSearchParams } from "react-router-dom"

export default function RoomsPage() {
  const [searchParams] = useSearchParams()
  const [rooms, setRooms] = useState<RoomCardProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  // Search States
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn")?.split("T")[0] || "")
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut")?.split("T")[0] || "")
  const [guests, setGuests] = useState(Number(searchParams.get("guests")) || 1)

  const [roomTypes, setRoomTypes] = useState<string[]>([])

  useEffect(() => {
    fetchRooms()
    fetchRoomTypes()
  }, [])

  const fetchRoomTypes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/room-types`)
      if (response.ok) {
        const data = await response.json()
        const types = data.result.map((t: any) => t.typeName)
        setRoomTypes(types)
      }
    } catch (error) {
      console.error("Error fetching room types", error)
    }
  }

  const fetchRooms = async () => {
    try {
      setIsLoading(true)
      let url = `${API_BASE_URL}/rooms`

      if (checkIn && checkOut) {
        // Append default times: 14:00 for check-in availability and 12:00 for check-out
        // This ensures compatibility with backend's expected LocalDateTime format
        const start = `${checkIn}T14:00:00`
        const end = `${checkOut}T12:00:00`
        url = `${API_BASE_URL}/rooms/available?checkIn=${start}&checkOut=${end}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const mappedRooms: RoomCardProps[] = data.result.map((r: any) => ({
          id: r.roomId,
          name: r.roomNumber,
          type: r.roomTypeName,
          description: r.description || `Phòng ${r.roomTypeName} tiện nghi.`,
          price: r.price,
          image: r.images && r.images.length > 0 ? r.images[0] : "/placeholder.svg?height=200&width=400",
          status: r.status === "AVAILABLE" ? "Available" : "Booked", // status mapped but hidden in UI
          capacity: r.maxAdults + r.maxChildren,
          amenities: r.amenities || [],
          rating: 0,
          reviews: 0
        }))
        setRooms(mappedRooms)
      } else {
        toast.error("Không thể tải danh sách phòng")
      }
    } catch (error) {
      console.error("Error fetching rooms", error)
      toast.error("Lỗi kết nối đến máy chủ")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "All" || room.type === filterType
    const matchesStatus = filterStatus === "All" || room.status === filterStatus
    const matchesGuests = room.capacity >= guests
    return matchesSearch && matchesType && matchesStatus && matchesGuests
  })

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-slate-50 py-12 md:py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Các phòng của chúng tôi</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Khám phá bộ sưu tập các phòng và suite được thiết kế tinh tế.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            {/* Row 1: General Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Search Bar */}
              <div>
                <label htmlFor="searchTerm" className="block text-sm font-medium text-slate-700 mb-1">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input
                    id="searchTerm"
                    type="text"
                    placeholder="Tên phòng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Filter by Type */}
              <div>
                <label htmlFor="filterType" className="block text-sm font-medium text-slate-700 mb-1">Loại phòng</label>
                <select
                  id="filterType"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="All">Tất cả</option>
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Status */}
              <div>
                <label htmlFor="filterStatus" className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                <select
                  id="filterStatus"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="All">Tất cả</option>
                  <option value="Available">Còn trống</option>
                  <option value="Booked">Đã đặt</option>
                </select>
              </div>

              {/* Guest Filter */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-slate-700 mb-1">Số khách</label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                    <option key={n} value={n}>{n} Khách</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Date Filters & Action */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-5">
                  <label htmlFor="checkIn" className="block text-sm font-medium text-slate-700 mb-1">Ngày đến</label>
                  <input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="checkOut" className="block text-sm font-medium text-slate-700 mb-1">Ngày đi</label>
                  <input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    onClick={fetchRooms}
                    className="w-full h-[42px] bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition flex items-center justify-center shadow-sm"
                  >
                    Tìm & Lọc
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">Sắp xếp theo:</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "name", label: "Tên" },
                { value: "price-low", label: "Giá: Tăng dần" },
                { value: "price-high", label: "Giá: Giảm dần" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${sortBy === option.value
                    ? "bg-teal-500 text-white shadow-md"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-600 mt-4 text-left">
            Hiển thị {sortedRooms.length} phòng
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin w-10 h-10 text-teal-600" />
            </div>
          ) : sortedRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedRooms.map((room) => (
                <RoomCard key={room.id} {...room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Không tìm thấy phòng nào</h3>
              <p className="text-slate-600">Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}