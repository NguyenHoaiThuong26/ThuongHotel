"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import RoomCard from "../../components/room/roomCard"
import type { RoomCardProps } from "../../components/room/roomCard"


const ROOMS_DATA: RoomCardProps[] = [
  {
    id: 1,
    name: "Deluxe Room",
    type: "Standard",
    description: "Comfortable room with city views and modern amenities",
    price: 149,
    image: "/images/luxury-hotel-deluxe-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "TV", "Mini Bar"],
  },
  {
    id: 2,
    name: "Ocean View Suite",
    type: "Suite",
    description: "Premium suite overlooking the ocean with private balcony",
    price: 249,
    image: "/images/luxury-hotel-ocean-view.jpg",
    status: "Available",
    capacity: 4,
    amenities: ["AC", "WiFi", "TV", "Jacuzzi", "Terrace"],
  },
  {
    id: 3,
    name: "Presidential Suite",
    type: "Luxury",
    description: "Ultimate luxury with separate living and dining areas",
    price: 599,
    image: "/images/luxury-hotel-presidential-suite.jpg",
    status: "Booked",
    capacity: 6,
    amenities: ["AC", "WiFi", "TV", "Spa", "Chef Kitchen", "Butler Service"],
  },
  {
    id: 4,
    name: "Garden Room",
    type: "Standard",
    description: "Serene room with access to private gardens",
    price: 129,
    image: "/images/luxury-hotel-garden-view.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "TV", "Garden Access"],
  },
  {
    id: 5,
    name: "Business Executive",
    type: "Standard",
    description: "Modern room designed for business travelers with work desk",
    price: 179,
    image: "/images/business-hotel-room.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "TV", "Work Desk", "High-Speed Internet"],
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    type: "Suite",
    description: "Romantic suite perfect for couples with spa amenities",
    price: 349,
    image: "/images/romantic-hotel-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "Spa Tub", "Rose Petals", "Champagne"],
  },
  {
    id: 7,
    name: "Family Villa",
    type: "Villa",
    description: "Spacious villa with multiple bedrooms for family stays",
    price: 449,
    image: "/images/family-villa-resort.jpg",
    status: "Booked",
    capacity: 8,
    amenities: ["AC", "WiFi", "TV", "Pool", "Kitchenette", "Living Area"],
  },
  {
    id: 8,
    name: "Penthouse",
    type: "Luxury",
    description: "Exclusive penthouse with 360-degree city views",
    price: 799,
    image: "/images/penthouse-luxury-room.jpg",
    status: "Available",
    capacity: 4,
    amenities: ["AC", "WiFi", "Rooftop Access", "Skybar", "Private Elevator"],
  },
  {
    id: 9,
    name: "Riverside Cottage",
    type: "Standard",
    description: "Charming cottage with riverside views and nature access",
    price: 189,
    image: "/images/riverside-cottage-hotel.jpg",
    status: "Available",
    capacity: 3,
    amenities: ["AC", "WiFi", "Porch", "Nature Trail Access"],
  },
  {
    id: 10,
    name: "Grand Ballroom Suite",
    type: "Suite",
    description: "Sophisticated suite ideal for events and celebrations",
    price: 399,
    image: "/images/grand-ballroom-suite.jpg",
    status: "Available",
    capacity: 50,
    amenities: ["AV Equipment", "Catering", "WiFi", "Multiple Rooms"],
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
      <section className="bg-gradient-to-r from-blue-50 to-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Our Rooms</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Discover our collection of elegantly designed rooms and suites, each offering unique comfort and luxury.
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
                  placeholder="Search rooms by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter by Type */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="All">All Types</option>
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
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-slate-700">Sort by:</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "name", label: "Name" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    sortBy === option.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-slate-600 mt-4 text-left">
            Showing {sortedRooms.length} of {ROOMS_DATA.length} rooms
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
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No rooms found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
