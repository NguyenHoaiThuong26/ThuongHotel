"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, Trash2 } from "lucide-react"
import { API_BASE_URL } from "../../configuration/configuration"

interface Room {
  id: string
  name: string
  type: string
  roomTypeId?: number // Add roomTypeId
  price: number
  status: "AVAILABLE" | "OCCUPIED" | "CLEANING" | "MAINTENANCE"
  amenities: string[]
  description?: string
  images?: string[]
  maxAdults: number
  maxChildren: number
  area?: number
}

interface RoomType {
  roomTypeId: number
  typeName: string
}

interface RoomModalProps {
  room?: Room | null
  onSave: (room: any, files?: File[]) => void
  onClose: () => void
}

export default function RoomModal({ room, onSave, onClose }: RoomModalProps) {
  const [formData, setFormData] = useState<Room>({
    id: room?.id || "",
    name: room?.name || "",
    type: room?.type || "",
    roomTypeId: room?.roomTypeId, // Initialize
    price: room?.price || 0,
    status: room?.status || "AVAILABLE",
    amenities: room?.amenities || [],
    description: room?.description || "",
    images: room?.images || [],
    maxAdults: room?.maxAdults ?? 2,
    maxChildren: room?.maxChildren ?? 1,
    area: room?.area ?? 20
  })

  // Add state for selected files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [newAmenity, setNewAmenity] = useState("")

  useEffect(() => {
    // Fetch Room Types
    const fetchTypes = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${API_BASE_URL}/room-types`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setRoomTypes(data.result)
          // Set default type if not set and types exist
          if (!formData.roomTypeId && data.result.length > 0) {
            // If editing and we have type name but no ID (legacy), try to match
            if (formData.type) {
              const matched = data.result.find((t: RoomType) => t.typeName === formData.type)
              if (matched) {
                setFormData(prev => ({ ...prev, roomTypeId: matched.roomTypeId }))
                return
              }
            }
            // Default to first
            setFormData(prev => ({
              ...prev,
              type: data.result[0].typeName,
              roomTypeId: data.result[0].roomTypeId
            }))
          }
        }
      } catch (error) {
        console.error("Error fetching types", error)
      }
    }
    fetchTypes()
  }, []) // Remove dependency on formData.type to avoid loop, simple init logic

  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]) 

  useEffect(() => {
    // Fetch Room Types
    const fetchTypes = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${API_BASE_URL}/room-types`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setRoomTypes(data.result)
          // Set default type if not set and types exist
          if (!formData.type && data.result.length > 0) {
            setFormData(prev => ({ ...prev, type: data.result[0].typeName }))
          }
        }
      } catch (error) {
        console.error("Error fetching types", error)
      }
    }
    fetchTypes()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData, selectedFiles)
  }

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity],
      })
      setNewAmenity("")
    }
  }

  const removeAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    })
  }

  //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.files) {
  //           // In a real app, upload these to cloud/server and get URLs
  //           // pushing mock URLs for demo visual
  //           const files = Array.from(e.target.files)
  //           // setSelectedFiles(prev => [...prev, ...files])
  //           const newImages = files.map(file => URL.createObjectURL(file))
  //            setFormData(prev => ({...prev, images: [...(prev.images || []), ...newImages]}))
  //       }
  //   }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-slate-900">
            {room ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Info Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Tên phòng</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Loại phòng</label>
                <select
                  value={formData.roomTypeId || (roomTypes.length > 0 ? roomTypes[0].roomTypeId : "")}
                  onChange={(e) => {
                    const selectedId = Number(e.target.value)
                    const selectedType = roomTypes.find(t => t.roomTypeId === selectedId)
                    if (selectedType) {
                      setFormData({
                        ...formData,
                        roomTypeId: selectedId,
                        type: selectedType.typeName
                      })
                    }
                  }}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {roomTypes.map((type) => (
                    <option key={type.roomTypeId} value={type.roomTypeId}>
                      {type.typeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="AVAILABLE">Có sẵn</option>
                  <option value="OCCUPIED">Đang sử dụng</option>
                  <option value="CLEANING">Đang dọn dẹp</option>
                  <option value="MAINTENANCE">Bảo trì</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Giá theo đêm ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Diện tích (m²)</label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Người lớn</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxAdults}
                    onChange={(e) => setFormData({ ...formData, maxAdults: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Trẻ em</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxChildren}
                    onChange={(e) => setFormData({ ...formData, maxChildren: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description & Amenities Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Mô tả chi tiết</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={4}
                  placeholder="Mô tả về view, không gian,..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Tiện nghi</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Thêm tiện nghi..."
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-teal-50 text-teal-800 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                        className="text-teal-600 hover:text-teal-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Hình ảnh phòng</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files)
                    setSelectedFiles(prev => [...prev, ...files]) // Store files
                    const newImages = files.map(file => URL.createObjectURL(file))
                    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...newImages] }))
                  }
                }}
              />
              <Upload className="mx-auto h-10 w-10 text-slate-400 mb-2" />
              <p className="text-sm text-slate-600">Kéo thả hoặc click để tải lên nhiều ảnh</p>
            </div>

            {/* Image Preview */}
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden border border-slate-200">
                    <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        images: prev.images?.filter((_, i) => i !== idx)
                      }))}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-medium"
            >
              {room ? "Cập nhật phòng" : "Thêm phòng"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-200 text-slate-900 py-2 rounded-lg hover:bg-slate-300 transition font-medium"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
