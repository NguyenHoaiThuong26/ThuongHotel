"use client"

import type React from "react"

import { useState } from "react"
import { Star, Loader2, X } from "lucide-react"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"

interface ReviewModalProps {
    bookingId: string
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function ReviewModal({ bookingId, isOpen, onClose, onSuccess }: ReviewModalProps) {
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0) {
            toast.error("Vui lòng chọn số sao đánh giá")
            return
        }

        setIsSubmitting(true)

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bookingId,
                    rating,
                    comment,
                }),
            })

            if (response.ok) {
                toast.success("Cảm ơn bạn đã đánh giá!")
                onSuccess()
                onClose()
            } else {
                const data = await response.json()
                toast.error(data.message || "Gửi đánh giá thất bại")
            }
        } catch (error) {
            console.error("Review submit error:", error)
            toast.error("Đã xảy ra lỗi khi gửi đánh giá")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div
                className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-100 p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Đánh giá kỳ nghỉ</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Star Rating */}
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-sm font-medium text-slate-600">Bạn cảm thấy thế nào?</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                                >
                                    <Star
                                        size={32}
                                        className={`transition-colors ${star <= (hoverRating || rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-slate-100 text-slate-300"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <span className="text-xs font-semibold text-yellow-500 h-4">
                            {rating > 0 && (
                                rating === 5 ? "Tuyệt vời!" :
                                    rating === 4 ? "Rất tốt" :
                                        rating === 3 ? "Bình thường" :
                                            rating === 2 ? "Tệ" : "Quá tệ"
                            )}
                        </span>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Chia sẻ cảm nhận của bạn</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Hãy kể thêm về trải nghiệm của bạn..."
                            className="w-full h-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-slate-700 placeholder:text-slate-400 text-sm"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || rating === 0}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white font-semibold rounded-lg transition-all
                ${(isSubmitting || rating === 0) ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700 hover:shadow-lg shadow-teal-500/20"}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Đang gửi...
                                </>
                            ) : (
                                "Gửi đánh giá"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
