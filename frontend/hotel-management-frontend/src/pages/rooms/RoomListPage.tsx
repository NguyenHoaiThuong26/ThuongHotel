"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import RoomCard from "../../components/room/roomCard"
import type { RoomCardProps } from "../../components/room/roomCard"

// Bản dịch tiện nghi sang tiếng Việt
const translateAmenities = (amenities: string[]) => {
  return amenities.map((amenity) => {
    switch (amenity) {
      case "AC":
        return "Điều hòa"
      case "WiFi":
        return "WiFi"
      case "TV":
        return "TV"
      case "Mini Bar":
        return "Mini Bar"
      case "Jacuzzi":
        return "Bồn tắm Jacuzzi"
      case "Terrace":
        return "Sân hiên"
      case "Spa":
        return "Spa"
      case "Chef Kitchen":
        return "Bếp riêng"
      case "Butler Service":
        return "Dịch vụ hầu phòng"
      case "Garden Access":
        return "Lối ra vườn"
      case "Work Desk":
        return "Bàn làm việc"
      case "High-Speed Internet":
        return "Internet tốc độ cao"
      case "Spa Tub":
        return "Bồn tắm Spa"
      case "Rose Petals":
        return "Cánh hoa hồng"
      case "Champagne":
        return "Rượu Champagne"
      case "Pool":
        return "Hồ bơi"
      case "Kitchenette":
        return "Gian bếp nhỏ"
      case "Living Area":
        return "Khu vực sinh hoạt"
      case "Rooftop Access":
        return "Lối lên sân thượng"
      case "Skybar":
        return "Skybar"
      case "Private Elevator":
        return "Thang máy riêng"
      case "Porch":
        return "Hiên"
      case "Nature Trail Access":
        return "Lối đi thiên nhiên"
      case "AV Equipment":
        return "Thiết bị AV"
      case "Catering":
        return "Dịch vụ ăn uống"
      case "Multiple Rooms":
        return "Nhiều phòng"
      default:
        return amenity
    }
  })
}

const ROOMS_DATA: RoomCardProps[] = [
  {
    id: 1,
    name: "Phòng Deluxe Cao Cấp",
    type: "Standard",
    description: "Phòng thoải mái với tầm nhìn thành phố và tiện nghi hiện đại",
    price: 149,
    image: "/images/luxury-hotel-deluxe-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: translateAmenities(["AC", "WiFi", "TV", "Mini Bar"]),
  },
  {
    id: 2,
    name: "Suite Hướng Biển Cao Cấp",
    type: "Suite",
    description: "Suite cao cấp nhìn ra biển với ban công riêng",
    price: 249,
    image: "/images/luxury-hotel-ocean-view.jpg",
    status: "Available",
    capacity: 4,
    amenities: translateAmenities(["AC", "WiFi", "TV", "Jacuzzi", "Terrace"]),
  },
  {
    id: 3,
    name: "Suite Tổng Thống",
    type: "Luxury",
    description: "Sang trọng tối đa với khu vực phòng khách và ăn riêng",
    price: 599,
    image: "/images/luxury-hotel-presidential-suite.jpg",
    status: "Booked",
    capacity: 6,
    amenities: translateAmenities(["AC", "WiFi", "TV", "Spa", "Chef Kitchen", "Butler Service"]),
  },
  {
    id: 4,
    name: "Phòng Hướng Vườn",
    type: "Standard",
    description: "Phòng yên tĩnh với lối ra vườn riêng",
    price: 129,
    image: "/images/luxury-hotel-garden-view.jpg",
    status: "Available",
    capacity: 2,
    amenities: translateAmenities(["AC", "WiFi", "TV", "Garden Access"]),
  },
  {
    id: 5,
    name: "Phòng Doanh Nhân Executive",
    type: "Standard",
    description: "Phòng hiện đại dành cho khách doanh nhân với bàn làm việc",
    price: 179,
    image: "/images/business-hotel-room.jpg",
    status: "Available",
    capacity: 2,
    amenities: translateAmenities(["AC", "WiFi", "TV", "Work Desk", "High-Speed Internet"]),
  },
  {
    id: 6,
    name: "Suite Tuần Trăng Mật",
    type: "Suite",
    description: "Suite lãng mạn hoàn hảo cho các cặp đôi với tiện nghi spa",
    price: 349,
    image: "/images/romantic-hotel-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: translateAmenities(["AC", "WiFi", "Spa Tub", "Rose Petals", "Champagne"]),
  },
  {
    id: 7,
    name: "Biệt Thự Gia Đình",
    type: "Villa",
    description: "Biệt thự rộng rãi với nhiều phòng ngủ cho gia đình",
    price: 449,
    image: "/images/family-villa-resort.jpg",
    status: "Booked",
    capacity: 8,
    amenities: translateAmenities(["AC", "WiFi", "TV", "Pool", "Kitchenette", "Living Area"]),
  },
  {
    id: 8,
    name: "Penthouse Cao Cấp",
    type: "Luxury",
    description: "Penthouse độc quyền với tầm nhìn 360 độ thành phố",
    price: 799,
    image: "/images/penthouse-luxury-room.jpg",
    status: "Available",
    capacity: 4,
    amenities: translateAmenities(["AC", "WiFi", "Rooftop Access", "Skybar", "Private Elevator"]),
  },
  {
    id: 9,
    name: "Cottage Ven Sông",
    type: "Standard",
    description: "Nhà nghỉ ven sông với tầm nhìn và tiếp cận thiên nhiên",
    price: 189,
    image: "/images/riverside-cottage-hotel.jpg",
    status: "Available",
    capacity: 3,
    amenities: translateAmenities(["AC", "WiFi", "Porch", "Nature Trail Access"]),
  },
  {
    id: 10,
    name: "Suite Grand Ballroom",
    type: "Suite",
    description: "Suite tinh tế, lý tưởng cho sự kiện và lễ kỷ niệm",
    price: 399,
    image: "/images/grand-ballroom-suite.jpg",
    status: "Available",
    capacity: 50,
    amenities: translateAmenities(["AV Equipment", "Catering", "WiFi", "Multiple Rooms"]),
  },
]


export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("name")

  // Filter rooms based on search and filters
  const filteredRooms = ROOMS_DATA.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "All" || room.type === filterType
    const matchesStatus = filterStatus === "All" || room.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
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

  const roomTypes = ["Standard", "Suite", "Luxury", "Villa"]

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-slate-50 py-12 md:py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Các phòng của chúng tôi</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Khám phá bộ sưu tập các phòng và suite được thiết kế tinh tế, mang lại sự thoải mái và sang trọng.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phòng theo tên hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Filter by Type */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="All">Tất cả loại phòng</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="All">Tất cả trạng thái</option>
                <option value="Available">Còn trống</option>
                <option value="Booked">Đã đặt</option>
              </select>
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    sortBy === option.value
                      ? "bg-teal-500 text-white shadow-md"
                      : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-slate-600 mt-4 text-left">
            Hiển thị {sortedRooms.length} trên {ROOMS_DATA.length} phòng
          </p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedRooms.length > 0 ? (
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

      {/* Footer */}
      <Footer />
    </div>
  )
}