"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Star, Users, Wifi, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import { Button } from "../../components/ui/button"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"

interface RoomDetail {
  id: string
  name: string
  type: string
  description: string
  price: number
  image: string
  status: "Available" | "Booked"
  capacity: number
  amenities: string[]
  rating?: number
  reviews?: number
  gallery?: string[]
  detailedDescription?: string
}

export default function RoomDetailPage() {
  // Define Review interface matching API response
  interface Review {
    reviewId: string
    rating: number
    comment: string
    authorName: string
    createdAt: string
  }

  const params = useParams()
  const roomId = params.id
  const [room, setRoom] = useState<RoomDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [reviews, setReviews] = useState<Review[]>([])
  const [newRating, setNewRating] = useState(0)
  const [newReviewText, setNewReviewText] = useState("")

  useEffect(() => {
    if (roomId) {
      fetchRoomDetail(roomId)
      fetchReviews(roomId)
    }
  }, [roomId])

  const fetchReviews = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/room/${id}`)
      if (response.ok) {
        const data = await response.json()
        setReviews(data.result)
      }
    } catch (e) {
      console.error("Failed to fetch reviews", e)
    }
  }

  const fetchRoomDetail = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/rooms/${id}`)
      if (response.ok) {
        const data = await response.json()
        const r = data.result
        const mappedRoom: RoomDetail = {
          id: r.roomId,
          name: r.roomNumber,
          type: r.roomTypeName,
          description: r.description,
          price: r.price,
          status: r.status === "available" ? "Available" : "Booked",
          capacity: r.maxAdults + r.maxChildren,
          amenities: r.amenities || [],
          image: r.images && r.images.length > 0 ? r.images[0] : "/placeholder.svg?height=500&width=1200",
          gallery: r.images && r.images.length > 0 ? r.images : ["/placeholder.svg?height=500&width=1200"],
          detailedDescription: r.description || "Chưa có mô tả chi tiết.",
          // Temp placeholder until reviews are loaded or if no reviews
          rating: 0,
          reviews: 0
        }
        setRoom(mappedRoom)
      } else {
        toast.error("Không tìm thấy thông tin phòng")
      }
    } catch (e) {
      console.error(e)
      toast.error("Lỗi kết nối")
    } finally {
      setIsLoading(false)
    }
  }

  // Update room stats when reviews change
  useEffect(() => {
    if (room && reviews.length > 0) {
      const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0)
      const avgRating = totalRating / reviews.length
      setRoom(prev => prev ? ({ ...prev, rating: parseFloat(avgRating.toFixed(1)), reviews: reviews.length }) : null)
    }
  }, [reviews])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (room?.gallery?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (room?.gallery?.length || 1)) % (room?.gallery?.length || 1))
  }

  const handleSubmitReview = () => {
    // Current implementation doesn't support writing via this page yet as it needs bookingId
    toast.error("Chức năng viết đánh giá tại chỗ đang được cập nhật. Vui lòng đánh giá từ lịch sử đặt phòng.")
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-teal-600" />
      </div>
    )
  }

  if (!room) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Không tìm thấy phòng</h1>
          <p className="text-slate-600 mb-8">Phòng bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/all-rooms">
            <Button className="bg-blue-600 hover:bg-blue-700">Quay về danh sách phòng</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />

      <section className="relative w-full pt-20">
        <div className="relative h-96 md:h-[500px] overflow-hidden bg-slate-200">
          <img
            src={room.gallery?.[currentImageIndex] || "/placeholder.svg?height=500&width=1200"}
            alt={`${room.name}`}
            className="w-full h-full object-cover"
          />

          {(room.gallery?.length ?? 0) > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition z-10"
              >
                <ChevronLeft className="w-6 h-6 text-slate-900" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition z-10"
              >
                <ChevronRight className="w-6 h-6 text-slate-900" />
              </button>
            </>
          )}
        </div>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {(room.gallery?.length ?? 1)}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 text-left">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{room.name}</h1>
                    <p className="text-lg text-slate-600">{room.type}</p>
                  </div>

                  {/* Status indicator has been removed */}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(room.rating ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-slate-900">{room.rating}</span>
                  <span className="text-slate-600">({room.reviews} đánh giá)</span>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Tiện nghi phòng</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Sức chứa</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-teal-600" />
                      <span className="text-lg font-semibold text-slate-900">{room.capacity} khách</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 mb-2">Giá</p>
                    <span className="text-2xl font-bold text-teal-600">{room.price.toLocaleString()} VND</span>
                    <p className="text-xs text-slate-500">mỗi đêm</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 mb-2">Internet</p>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-teal-600" />
                      <span className="font-semibold text-slate-900">WiFi tốc độ cao</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Thông tin về phòng</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed whitespace-pre-line">
                  {room.detailedDescription}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Tiện ích</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                      <span className="text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
                {room.amenities.length === 0 && (
                  <p className="text-slate-500 italic">Chưa có tiện ích nào được cập nhật.</p>
                )}
              </div>
            </div>

            <div>
              <div className="bg-slate-50 rounded-lg p-8 sticky top-24 shadow-sm">
                <div className="text-center mb-8">
                  <p className="text-sm text-slate-600 mb-2">Bắt đầu từ</p>
                  <div className="text-4xl font-bold text-teal-600 mb-1">{room.price.toLocaleString()} VND</div>
                  <p className="text-slate-600">mỗi đêm</p>
                </div>

                <div className="space-y-3 mb-8">
                  <Link to={`/booking/${room.id}`}>
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-md hover:brightness-105 h-12 text-lg">
                      Đặt ngay
                    </Button>
                  </Link>

                  <Link to="/all-rooms">
                    <Button
                      variant="outline"
                      className="w-full border-teal-500 text-teal-500 hover:bg-teal-50 bg-transparent h-12 text-lg"
                    >
                      Quay về danh sách phòng
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4 pt-8 border-t border-slate-200 text-left">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Sức chứa tối đa</p>
                    <p className="text-slate-600">{room.capacity} khách tối đa</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Đánh giá khách</p>
                    <p className="text-slate-600">{room.reviews} đánh giá xác thực</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Loại phòng</p>
                    <p className="text-slate-600">{room.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Đánh giá khách</h2>

          <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
            <h3 className="text-xl font-semibold mb-4">Viết đánh giá của bạn</h3>

            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                    }`}
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>

            <textarea
              className="w-full border border-slate-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={4}
              placeholder="Viết đánh giá của bạn..."
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
            />

            <Button
              onClick={handleSubmitReview}
              className="bg-teal-500 text-white hover:bg-teal-600"
            >
              Gửi đánh giá
            </Button>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.reviewId}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                          }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>

                <p className="text-slate-700 mb-3">{review.comment}</p>
                <p className="font-semibold text-slate-900 text-sm">{review.authorName}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
