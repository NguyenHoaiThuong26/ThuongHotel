"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Edit2, Trash2, Loader2, Search } from "lucide-react"
import RoomModal from "../admin/roomModal"
import RoomStatusModal from "../admin/roomStatusModal"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"
import { hasRoleSync } from "../../utils/auth"

interface Room {
  id: string
  name: string
  roomId: string
  roomNumber: string
  roomTypeName: string
  type: string
  roomTypeId?: number
  price: number
  status: string
  maxAdults: number
  maxChildren: number
  amenities?: string[]
  area?: number
  description?: string
  images?: string[]
}

interface RoomManagementProps {
  userRoles?: string[]
}

export default function RoomManagement({ userRoles = [] }: RoomManagementProps) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState<any | null>(null)
  const [statusRoomId, setStatusRoomId] = useState<string>("")
  const [statusRoomStatus, setStatusRoomStatus] = useState<string>("")
  const navigate = useNavigate()

  /* Search State */
  const [searchTerm, setSearchTerm] = useState("")

  // Updated logic: Receptionists and Staff are restricted to Status View
  const isRestrictedView = (hasRoleSync(userRoles, "STAFF") || hasRoleSync(userRoles, "RECEPTIONIST")) && !hasRoleSync(userRoles, "ADMIN")

  /* Debounce Search or Enter Search */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRooms(searchTerm)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const fetchRooms = async (keyword = "") => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      // Build Query Params
      const params = new URLSearchParams()
      if (keyword) params.append("keyword", keyword)

      const response = await fetch(`${API_BASE_URL}/rooms?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.status === 401) {
        toast.error("Phiên đăng nhập hết hạn")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }
      if (response.ok) {
        const data = await response.json()
        const mappedRooms = data.result.map((r: any) => ({
          id: r.roomId,
          name: r.roomNumber,
          type: r.roomTypeName,
          roomTypeId: r.roomTypeId,
          price: r.price,
          status: r.status,
          maxAdults: r.maxAdults,
          maxChildren: r.maxChildren,
          area: r.area,
          description: r.description,
          images: r.images,
          amenities: r.amenities || []
        }))
        setRooms(mappedRooms)
      }
    } catch (error) {
      console.error("Error fetching rooms", error)
      toast.error("Lỗi tải danh sách phòng")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddRoom = async (newRoom: any, files?: File[]) => {
    try {
      const token = localStorage.getItem("token")

      const roomData = {
        roomNumber: newRoom.name,
        price: newRoom.price,
        maxAdults: newRoom.maxAdults,
        maxChildren: newRoom.maxChildren,
        floor: 1,
        description: newRoom.description || "",
        status: newRoom.status,
        roomTypeId: newRoom.roomTypeId,
        area: newRoom.area,
        amenities: newRoom.amenities || []
      }

      const formData = new FormData()
      formData.append("request", JSON.stringify(roomData))
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("images", file)
        })
      }

      const response = await fetch(`${API_BASE_URL}/rooms`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (response.status === 401) {
        toast.error("Phiên đăng nhập hết hạn")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      if (response.ok) {
        toast.success("Thêm phòng thành công")
        fetchRooms(searchTerm) // Refresh with current search
        setShowModal(false)
      } else {
        const data = await response.json()
        toast.error(data.message || "Thêm thất bại")
      }
    } catch (e) {
      toast.error("Lỗi kết nối")
    }
  }

  const handleEditRoom = async (updatedRoom: any, files?: File[]) => {
    try {
      const token = localStorage.getItem("token")

      const payload = {
        roomNumber: updatedRoom.name,
        price: updatedRoom.price,
        maxAdults: updatedRoom.maxAdults,
        maxChildren: updatedRoom.maxChildren,
        floor: 1,
        description: updatedRoom.description || "",
        status: updatedRoom.status,
        roomTypeId: updatedRoom.roomTypeId,
        amenities: updatedRoom.amenities || [],
        area: updatedRoom.area,
        retainedImages: updatedRoom.images ? updatedRoom.images.filter((img: string) => !img.startsWith("blob:")) : []
      }

      const formData = new FormData()
      formData.append("request", JSON.stringify(payload))

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("images", file)
        })
      }

      const response = await fetch(`${API_BASE_URL}/rooms/${updatedRoom.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (response.status === 401) {
        toast.error("Phiên đăng nhập hết hạn")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      if (response.ok) {
        toast.success("Cập nhật thành công")
        fetchRooms(searchTerm)
        setEditingRoom(null)
        setShowModal(false)
      } else {
        const data = await response.json()
        toast.error(data.message || "Cập nhật thất bại")
      }
    } catch (e) {
      toast.error("Lỗi kết nối")
    }
  }

  const handleDeleteRoom = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa phòng này?")) return
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.status === 401) {
        toast.error("Phiên đăng nhập hết hạn")
        localStorage.removeItem("token")
        navigate("/login")
        return
      }
      if (response.ok) {
        toast.success("Xóa phòng thành công")
        fetchRooms(searchTerm)
      } else {
        toast.error("Xóa thất bại")
      }
    } catch (e) {
      console.error(e)
      toast.error("Lỗi kết nối")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
      case "available":
        return "bg-green-100 text-green-800"
      case "OCCUPIED":
      case "occupied":
        return "bg-blue-100 text-blue-800"
      case "CLEANING":
      case "cleaning":
        return "bg-yellow-100 text-yellow-800"
      case "MAINTENANCE":
      case "maintenance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Loading state moved to table body or handled by overlay? 
  // If we return null here, the whole page flickers. Better to show structure + spinner.
  // But for simple fix:
  if (isLoading && rooms.length === 0) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Quản lý Phòng</h1>

        <div className="flex gap-4 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm theo mã phòng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-64"
            />
          </div>

          {!isRestrictedView && (
            <button
              onClick={() => {
                setEditingRoom(null)
                setShowModal(true)
              }}
              className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition shrink-0"
            >
              <Plus size={20} />
              Thêm Phòng
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Mã phòng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Loại</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Giá</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Người lớn</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Trẻ em</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Diện tích</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && rooms.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8"><Loader2 className="animate-spin h-8 w-8 mx-auto text-teal-600" /></td></tr>
              ) : (
                <>
                  {rooms.map((room) => (
                    <tr key={room.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{room.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{room.type}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{room.maxAdults}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{room.maxChildren}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{room.area}m²</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                    ${getStatusColor(room.status)}`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {isRestrictedView ? (
                            <button
                              onClick={() => {
                                setStatusRoomId(room.id)
                                setStatusRoomStatus(room.status)
                                setShowStatusModal(true)
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                              title="Cập nhật trạng thái"
                            >
                              <Edit2 size={18} />
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingRoom({
                                    id: room.id,
                                    name: room.name,
                                    type: room.type,
                                    price: room.price,
                                    status: room.status,
                                    maxAdults: room.maxAdults,
                                    maxChildren: room.maxChildren,
                                    roomTypeId: room.roomTypeId,
                                    area: room.area,
                                    description: room.description,
                                    images: room.images,
                                    amenities: room.amenities || []
                                  })
                                  setShowModal(true)
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                title="Chỉnh sửa thông tin"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteRoom(room.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {rooms.length === 0 && (
                    <tr><td colSpan={9} className="text-center py-8 text-gray-500">Không tìm thấy phòng nào</td></tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

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

      {showStatusModal && (
        <RoomStatusModal
          roomId={statusRoomId}
          currentStatus={statusRoomStatus}
          onClose={() => {
            setShowStatusModal(false)
            setStatusRoomId("")
            setStatusRoomStatus("")
          }}
          onSuccess={() => {
            fetchRooms(searchTerm) // Refresh
          }}
        />
      )}
    </div>
  )
}
