"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import RoomModal from "../admin/roomModal"

interface Room {
  id: string
  name: string
  type: string
  price: number
  status: "available" | "occupied" | "maintenance"
  amenities: string[]
}

const sampleRooms: Room[] = [
  {
    id: "R001",
    name: "Deluxe Suite",
    type: "Suite",
    price: 250,
    status: "available",
    amenities: ["WiFi", "AC", "TV"],
  },
  {
    id: "R002",
    name: "Ocean View Room",
    type: "Room",
    price: 180,
    status: "occupied",
    amenities: ["WiFi", "Balcony", "Mini Bar"],
  },
  {
    id: "R003",
    name: "Garden Suite",
    type: "Suite",
    price: 220,
    status: "maintenance",
    amenities: ["WiFi", "Garden View", "Spa"],
  },
]

export default function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>(sampleRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || room.type === typeFilter
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddRoom = (newRoom: Omit<Room, "id">) => {
    const room: Room = { ...newRoom, id: `R${Date.now()}` }
    setRooms([...rooms, room])
    setShowModal(false)
  }

  const handleEditRoom = (updatedRoom: Room) => {
    setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)))
    setEditingRoom(null)
    setShowModal(false)
  }

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id))
  }

  const handleStatusChange = (id: string, newStatus: "available" | "occupied" | "maintenance") => {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Room Management</h1>
        <button
          onClick={() => {
            setEditingRoom(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md">
        <div>
          <label className="text-sm font-medium text-slate-700">Search</label>
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Suite">Suite</option>
            <option value="Room">Room</option>
            <option value="Deluxe">Deluxe</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Results</label>
          <div className="mt-1 px-3 py-2 bg-slate-50 rounded-lg text-slate-700 font-medium">
            {filteredRooms.length} rooms
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Room ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Amenities</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{room.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{room.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{room.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">${room.price}</td>
                  <td className="px-6 py-4">
                    <select
                      value={room.status}
                      onChange={(e) => handleStatusChange(room.id, e.target.value as any)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer border-0 ${getStatusColor(room.status)}`}
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {room.amenities.map((a) => (
                      <span key={a} className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded mr-2 text-xs">
                        {a}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingRoom(room)
                          setShowModal(true)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <RoomModal
          room={editingRoom}
          onSave={editingRoom ? handleEditRoom : handleAddRoom}
          onClose={() => {
            setShowModal(false)
            setEditingRoom(null)
          }}
        />
      )}
    </div>
  )
}
