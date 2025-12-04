"use client"

import { Link } from 'react-router-dom'
import { Star, Wifi, Utensils, Dumbbell, Car, Droplets } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import { Button } from "../../components/ui/button"

export default function HomePage() {

  const rooms = [
    { id:1, name:"Suite Deluxe", price:"$299", image:"/images/luxury-hotel-deluxe-suite.jpg", description:"Phòng suite rộng rãi với tầm nhìn thành phố và tiện nghi hiện đại" },
    { id:2, name:"Phòng Nhìn Biển", price:"$349", image:"/images/luxury-hotel-ocean-view.jpg", description:"Phòng cao cấp nhìn ra biển với ban công riêng" },
    { id:3, name:"Suite Tổng Thống", price:"$599", image:"/images/luxury-hotel-presidential-suite.jpg", description:"Sang trọng tối đa với phòng khách và phòng ăn riêng biệt" },
    { id:4, name:"Phòng Vườn", price:"$249", image:"/images/luxury-hotel-garden-view.jpg", description:"Phòng yên tĩnh với lối ra vườn riêng" },
  ]

  const amenities = [
    { id:1, name:"Hồ bơi", icon:Droplets },
    { id:2, name:"Nhà hàng", icon:Utensils },
    { id:3, name:"Phòng tập Gym", icon:Dumbbell },
    { id:4, name:"WiFi miễn phí", icon:Wifi },
    { id:5, name:"Đỗ xe Valet", icon:Car },
  ]

  const reviews = [
    { id:1, name:"Sarah Johnson", rating:5, comment:"Dịch vụ xuất sắc và cảnh quan tuyệt đẹp.", image:"/images/profile-woman.jpg" },
    { id:2, name:"Michael Chen", rating:5, comment:"Sự chú ý đến từng chi tiết thật đáng kinh ngạc.", image:"/images/profile-man.jpg" },
    { id:3, name:"Emma Wilson", rating:5, comment:"Phòng ốc sang trọng kết hợp với dịch vụ khách sạn tuyệt vời.", image:"/images/profile-woman-2.jpg" },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-white">
      <Navbar />

      {/* Hero */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/images/luxury-hotel-lobby-grand.jpg" alt="Hình nền chính" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInUp">Chào mừng đến Thuong Hotel</h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Trải nghiệm sự thoải mái, sang trọng và dịch vụ đẳng cấp thế giới tại khách sạn của chúng tôi.
          </p>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:brightness-105 text-white px-8 py-3 text-lg animate-fadeInUp animation-delay-400">
              Đặt phòng ngay
            </Button>
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img src="/images/luxury-hotel-room-interior.jpg" alt="Phòng khách sạn" className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"/>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Về Khách Sạn Của Chúng Tôi</h2>
              <p className="text-lg text-slate-600 mb-4">
                Thành lập năm 1985, Thuong Hotel đã trở thành điểm đến hàng đầu cho những du khách tinh tế tìm kiếm trải nghiệm tuyệt vời.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Với 250 phòng được trang trí đẹp mắt, ẩm thực đẳng cấp thế giới và đầy đủ tiện nghi, chúng tôi mang đến một nơi nghỉ dưỡng sang trọng và tiện nghi.
              </p>
              <Link to="/login">
                <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50 bg-transparent">
                  Tìm hiểu thêm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section id="rooms" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4">Các Phòng Nổi Bật</h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">Khám phá bộ sưu tập phòng được thiết kế tinh tế của chúng tôi.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div 
                key={room.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300 h-full flex flex-col"
              >
                <div className="overflow-hidden h-48">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{room.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 flex-1">{room.description}</p>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-teal-500">{room.price}</span>
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:brightness-105 font-semibold shadow-md">
                      Xem chi tiết
                    </Button>

                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4">Tiện Nghi Đẳng Cấp Thế Giới</h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">Thưởng thức các tiện nghi đầy đủ được thiết kế cho sự thoải mái của bạn.</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {amenities.map((amenity) => {
              const IconComponent = amenity.icon
              return (
                <div key={amenity.id} className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-lg hover:bg-teal-50 transition-colors group">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white"/>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{amenity.name}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-4">Đánh Giá Khách Hàng</h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">Nghe những chia sẻ từ các vị khách về trải nghiệm khó quên tại khách sạn.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4 object-cover"/>
                  <div>
                    <h3 className="font-semibold text-slate-900">{review.name}</h3>
                    <div className="flex gap-1">{[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400"/>))}</div>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
