import { useState } from "react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import BookingForm, { type BookingFormData } from "../../components/room/bookingForm"
import BookingSummary from "../../components/room/bookingSummary"
import BookingConfirmationModal from "../../components/room/bookingConfirmation"

const ROOMS_DATA = [
  {
    id: 1,
    name: "Phòng Deluxe",
    type: "Standard",
    price: 149,
    image: "/luxury-hotel-deluxe-suite.jpg",
    amenities: ["Điều hòa", "WiFi", "TV", "Mini Bar"],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Suite Nhìn Biển",
    type: "Suite",
    price: 249,
    image: "/luxury-hotel-ocean-view.jpg",
    amenities: ["Điều hòa", "WiFi", "TV", "Jacuzzi", "Sân thượng"],
    rating: 4.8,
    reviews: 256,
  },
  {
    id: 3,
    name: "Suite Tổng Thống",
    type: "Luxury",
    price: 599,
    image: "/luxury-hotel-presidential-suite.jpg",
    amenities: ["Điều hòa", "WiFi", "TV", "Spa", "Nhà bếp riêng", "Dịch vụ quản gia"],
    rating: 5.0,
    reviews: 89,
  },
  {
    id: 4,
    name: "Phòng Garden",
    type: "Standard",
    price: 129,
    image: "/luxury-hotel-garden-view.jpg",
    amenities: ["Điều hòa", "WiFi", "TV", "Truy cập vườn"],
    rating: 4.3,
    reviews: 95,
  },
  {
    id: 5,
    name: "Business Executive",
    type: "Standard",
    price: 179,
    image: "/business-hotel-room.jpg",
    amenities: ["Điều hòa", "WiFi", "TV", "Bàn làm việc", "Internet tốc độ cao"],
    rating: 4.6,
    reviews: 142,
  },
  {
    id: 6,
    name: "Suite Honeymoon",
    type: "Suite",
    price: 349,
    image: "/romantic-hotel-suite.jpg",
    amenities: ["Điều hòa", "WiFi", "Bồn tắm spa", "Cánh hoa hồng", "Champagne"],
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 7,
    name: "Biệt thự Gia đình",
    type: "Villa",
    price: 449,
    image: "/family-villa-resort.jpg",
    amenities: ["Điều hòa", "WiFi", "TV", "Hồ bơi", "Bếp nhỏ", "Khu sinh hoạt"],
    rating: 4.7,
    reviews: 176,
  },
  {
    id: 8,
    name: "Penthouse",
    type: "Luxury",
    price: 799,
    image: "/penthouse-luxury-room.jpg",
    amenities: ["Điều hòa", "WiFi", "Truy cập sân thượng", "Skybar", "Thang máy riêng"],
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 9,
    name: "Cottage Bên Sông",
    type: "Standard",
    price: 189,
    image: "/riverside-cottage-hotel.jpg",
    amenities: ["Điều hòa", "WiFi", "Hiên nhà", "Truy cập đường mòn thiên nhiên"],
    rating: 4.4,
    reviews: 118,
  },
  {
    id: 10,
    name: "Grand Ballroom Suite",
    type: "Suite",
    price: 399,
    image: "/grand-ballroom-suite.jpg",
    amenities: ["Thiết bị AV", "Dịch vụ ăn uống", "WiFi", "Nhiều phòng"],
    rating: 4.8,
    reviews: 145,
  },
]

export default function BookingPage() {
  const params = useParams()
  const roomId = Number(params.id)

  if (isNaN(roomId)) return <div>ID phòng không hợp lệ</div>
  const room = ROOMS_DATA.find((r) => r.id === roomId)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    formData: BookingFormData
    roomName: string
    pricePerNight: number
    nights: number
    totalPrice: number
  } | null>(null)

  if (!room) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Không tìm thấy phòng</h1>
          <p className="text-slate-600 mb-8">Phòng bạn đang cố đặt không tồn tại.</p>
          <Link to="/rooms">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition">
              Quay lại danh sách phòng
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const navigate = useNavigate();
  
  const handleSubmit = (formData: BookingFormData) => {
  setIsLoading(true);

  // Giả lập API call
  setTimeout(() => {
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * room.price;

    // Tạo object booking để gửi sang PaymentPage
    const bookingData = {
      formData,
      room: room,
      nights,
      totalPrice,
    };

    // Lưu tạm vào localStorage
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    setIsLoading(false);

    // Chuyển sang trang payment
    navigate(`/payment/${room.id}`);
  }, 1500);
};


  // const handleSubmit = (formData: BookingFormData) => {
  //   setIsLoading(true)

  //   // Giả lập API call
  //   setTimeout(() => {
  //     const checkIn = new Date(formData.checkInDate)
  //     const checkOut = new Date(formData.checkOutDate)
  //     const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  //     const totalPrice = nights * room.price

  //     setBookingConfirmation({
  //       formData,
  //       roomName: room.name,
  //       pricePerNight: room.price,
  //       nights,
  //       totalPrice,
  //     })
  //     setShowConfirmation(true)
  //     setIsLoading(false)
  //   }, 1500)
  // }

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
                  roomId={room.id}
                  pricePerNight={room.price}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
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
