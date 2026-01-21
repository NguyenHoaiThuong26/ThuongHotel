"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface RoomType {
    roomTypeId?: number
    typeName: string
    description: string
}

interface RoomTypeModalProps {
    roomType?: RoomType | null
    onSave: (type: any) => void
    onClose: () => void
}

export default function RoomTypeModal({ roomType, onSave, onClose }: RoomTypeModalProps) {
    const [formData, setFormData] = useState<RoomType>({
        roomTypeId: roomType?.roomTypeId,
        typeName: roomType?.typeName || "",
        description: roomType?.description || ""
    })

    // Update form if roomType prop changes
    useEffect(() => {
        if (roomType) {
            setFormData(roomType)
        }
    }, [roomType])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-slate-900">
                        {roomType ? "Chỉnh sửa loại phòng" : "Thêm loại phòng mới"}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Tên loại phòng</label>
                        <input
                            type="text"
                            value={formData.typeName}
                            onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
                            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                            placeholder="Ví dụ: Deluxe Suite"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Mô tả</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows={4}
                            placeholder="Mô tả chi tiết về loại phòng này..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="submit"
                            className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-medium"
                        >
                            {roomType ? "Cập nhật" : "Thêm mới"}
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
