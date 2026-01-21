import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import BookingForm, { type BookingFormData } from "../../components/room/bookingForm"
import BookingSummary from "../../components/room/bookingSummary"
import BookingConfirmationModal from "../../components/room/bookingConfirmation"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

export default function BookingPage() {
  const params = useParams()
  const roomId = params.id

  const [room, setRoom] = useState<any>(null)
  const [isLoadingRoom, setIsLoadingRoom] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    formData: BookingFormData
    roomName: string
    pricePerNight: number
    nights: number
    totalPrice: number
  } | null>(null)

  useEffect(() => {
    if (roomId) fetchRoomDetail(roomId)
  }, [roomId])

  const fetchRoomDetail = async (id: string) => {
    try {
      setIsLoadingRoom(true)
      const response = await fetch(`${API_BASE_URL}/rooms/${id}`)
      if (response.ok) {
        const data = await response.json()
        const r = data.result
        const mappedRoom = {
          id: r.roomId,
          name: r.roomNumber,
          type: r.roomTypeName,
          price: r.price,
          image: r.images && r.images.length > 0 ? r.images[0] : "/placeholder.svg?height=500&width=1200",
          amenities: r.amenities || [],
          rating: 5,
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
      setIsLoadingRoom(false)
    }
  }

  const handleSubmit = async (formData: BookingFormData) => {
    if (!room) return
    setIsSubmitting(true);

    try {
      const payload = {
        roomId: room.id,
        checkIn: new Date(formData.checkInDate).toISOString(),
        checkOut: new Date(formData.checkOutDate).toISOString(),
        numAdults: formData.adults,
        numChildren: formData.children
      };

      // Call backend
      const token = localStorage.getItem("token")

      if (!token) {
        toast.error("Vui lòng đăng nhập để đặt phòng")
        // Optionally redirect to login
        // navigate('/login') 
        return
      }

      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        const checkIn = new Date(formData.checkInDate)
        const checkOut = new Date(formData.checkOutDate)
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

        setBookingConfirmation({
          formData,
          roomName: room.name,
          pricePerNight: room.price,
          nights,
          totalPrice: data.result?.totalPrice || (nights * room.price),
        })
        setShowConfirmation(true)
      } else {
        toast.error("Đặt phòng thất bại: " + (data.message || "Lỗi không xác định"));
      }

    } catch (error) {
      console.error("Booking Error", error);
      toast.error("Lỗi kết nối đến máy chủ");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingRoom) {
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
          <p className="text-slate-600 mb-8">Phòng bạn đang cố đặt không tồn tại.</p>
          <Link to="/all-rooms">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition">
              Quay lại danh sách phòng
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Phần đặt phòng */}
      <section className="py-12 md:py-16 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Hoàn tất đặt phòng</h1>
          <p className="text-lg text-slate-600 mb-12">Điền thông tin của bạn để hoàn tất việc đặt phòng</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cột trái - Form đặt phòng */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200">
                <BookingForm
                  pricePerNight={room.price}
                  onSubmit={handleSubmit}
                  isLoading={isSubmitting}
                />
              </div>
            </div>

            {/* Cột phải - Tóm tắt phòng */}
            <div>
              <BookingSummary room={room} />
            </div>
          </div>
        </div>
      </section>

      {/* Modal xác nhận */}
      <BookingConfirmationModal isOpen={showConfirmation} bookingData={bookingConfirmation} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
