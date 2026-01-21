"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import RoomTypeModal from "./roomTypeModal"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"

interface RoomType {
    roomTypeId: number
    typeName: string
    description: string
}

export default function RoomTypeManagement() {
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingType, setEditingType] = useState<RoomType | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchRoomTypes()
    }, [])

    const fetchRoomTypes = async () => {
        try {
            const token = localStorage.getItem("token")
            const headers: HeadersInit = {}
            if (token) {
                headers["Authorization"] = `Bearer ${token}`
            }

            const response = await fetch(`${API_BASE_URL}/room-types`, {
                headers: headers
            })

            if (response.status === 401) {
                toast.error("Phiên đăng nhập hết hạn")
                localStorage.removeItem("token")
                navigate("/login")
                return
            }

            if (response.ok) {
                const data = await response.json()
                setRoomTypes(data.result)
            }
        } catch (error) {
            console.error("Error fetching room types:", error)
            toast.error("Lỗi tải danh sách loại phòng")
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddType = async (newType: Omit<RoomType, "roomTypeId">) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_BASE_URL}/room-types`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newType)
            })

            if (response.status === 401) {
                toast.error("Phiên đăng nhập hết hạn")
                localStorage.removeItem("token")
                navigate("/login")
                return
            }

            const data = await response.json()

            if (response.ok) {
                toast.success("Thêm loại phòng thành công")
                fetchRoomTypes()
                setShowModal(false)
            } else {
                toast.error(data.message || "Thêm thất bại")
            }
        } catch (error) {
            toast.error("Lỗi kết nối")
        }
    }

    const handleEditType = async (updatedType: RoomType) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_BASE_URL}/room-types/${updatedType.roomTypeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedType)
            })

            if (response.status === 401) {
                toast.error("Phiên đăng nhập hết hạn")
                localStorage.removeItem("token")
                navigate("/login")
                return
            }

            const data = await response.json()

            if (response.ok) {
                toast.success("Cập nhật thành công")
                fetchRoomTypes()
                setEditingType(null)
                setShowModal(false)
            } else {
                toast.error(data.message || "Cập nhật thất bại")
            }
        } catch (error) {
            toast.error("Lỗi kết nối")
        }
    }

    const handleDeleteType = async (id: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa loại phòng này?")) return

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_BASE_URL}/room-types/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 401) {
                toast.error("Phiên đăng nhập hết hạn")
                localStorage.removeItem("token")
                navigate("/login")
                return
            }

            if (response.ok) {
                toast.success("Xóa thành công")
                fetchRoomTypes()
            } else {
                toast.error("Xóa thất bại")
            }
        } catch (error) {
            toast.error("Lỗi kết nối")
        }
    }

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900">Quản lý Loại Phòng</h1>
                <button
                    onClick={() => {
                        setEditingType(null)
                        setShowModal(true)
                    }}
                    className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                >
                    <Plus size={20} />
                    Thêm Loại Phòng
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Tên Loại</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Mô tả</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomTypes.map((type) => (
                                <tr key={type.roomTypeId} className="border-b border-slate-200 hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{type.roomTypeId}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700">{type.typeName}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700">{type.description}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditingType(type)
                                                    setShowModal(true)
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteType(type.roomTypeId)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {roomTypes.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-500">Chưa có loại phòng nào</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <RoomTypeModal
                    roomType={editingType}
                    onSave={editingType ? handleEditType : handleAddType}
                    onClose={() => {
                        setShowModal(false)
                        setEditingType(null)
                    }}
                />
            )}
        </div>
    )
}
