import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { Star, Users, Wifi, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import { Button } from "../../components/ui/button"
import type { RoomDetailCardProps } from "../../components/room/roomDetailCard"

const ROOMS_DATA: RoomDetailCardProps[] = [
  {
    id: 1,
    name: "Phòng Deluxe",
    type: "Tiêu chuẩn",
    description: "Phòng thoải mái với tầm nhìn thành phố và tiện nghi hiện đại",
    price: 149,
    image: "/images/luxury-hotel-deluxe-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["Điều hòa", "WiFi", "TV", "Tủ minibar"],
    rating: 4.5,
    reviews: 128,
    gallery: ["/images/luxury-hotel-deluxe-suite.jpg", "/images/business-hotel-room.jpg", "/images/riverside-cottage-hotel.jpg"],
    detailedDescription: `Trải nghiệm sự tiện nghi tối đa trong Phòng Deluxe của chúng tôi. Không gian được thiết kế tinh tế, kết hợp sự sang trọng hiện đại với sự hiếu khách nồng hậu. Mỗi phòng có giường cao cấp, hệ thống giải trí hiện đại và cửa sổ kính từ trần đến sàn với tầm nhìn thành phố tuyệt đẹp.

Phòng Deluxe của chúng tôi lý tưởng cho cả khách đi công tác lẫn khách du lịch tìm kiếm sự cân bằng giữa sang trọng và hợp lý. Phòng bao gồm bàn làm việc rộng rãi, WiFi tốc độ cao và khu vực ghế ngồi thoải mái để thư giãn sau một ngày dài.

Thức dậy với dịch vụ cà phê và trà miễn phí, với dịch vụ phòng 24/7. Phòng tắm bằng đá cẩm thạch trang bị đồ dùng cao cấp, vòi sen mưa và giá treo khăn sưởi ấm cho sự thoải mái tối đa.`,
  },
  {
    id: 2,
    name: "Ocean View Suite",
    type: "Suite",
    description: "Suite cao cấp nhìn ra biển với ban công riêng",
    price: 249,
    image: "/images/luxury-hotel-ocean-view.jpg",
    status: "Available",
    capacity: 4,
    amenities: ["Điều hòa", "WiFi", "TV", "Bồn tắm Jacuzzi", "Ban công"],
    rating: 4.8,
    reviews: 256,
    gallery: ["/images/luxury-hotel-ocean-view.jpg", "/images/romantic-hotel-suite.jpg", "/images/family-villa-resort.jpg"],
    detailedDescription: `Đắm mình trong sự sang trọng tuyệt đối với Ocean View Suite của chúng tôi. Không gian rộng lớn này mang đến tầm nhìn toàn cảnh ra biển từ ban công riêng, tạo nên trải nghiệm nghỉ dưỡng không thể quên.

Suite bao gồm phòng khách rộng với nội thất sang trọng, phòng ngủ riêng với giường cỡ king và phòng tắm bằng đá cẩm thạch với bồn Jacuzzi. Mỗi chi tiết được chăm chút kỹ lưỡng để mang lại sự thoải mái và thư giãn tối đa.

Đội ngũ concierge luôn sẵn sàng 24/7 để sắp xếp trải nghiệm đặc biệt, đặt bàn ăn hoặc đáp ứng mọi yêu cầu để kỳ nghỉ của bạn thật sự đáng nhớ.`,
  },
  {
    id: 3,
    name: "Presidential Suite",
    type: "Sang trọng",
    description: "Sang trọng tối đa với khu vực sinh hoạt và ăn uống riêng",
    price: 599,
    image: "/images/luxury-hotel-presidential-suite.jpg",
    status: "Booked",
    capacity: 6,
    amenities: ["Điều hòa", "WiFi", "TV", "Spa", "Bếp riêng", "Dịch vụ quản gia"],
    rating: 5.0,
    reviews: 89,
    gallery: ["/images/luxury-hotel-presidential-suite.jpg", "/images/penthouse-luxury-room.jpg", "/images/grand-ballroom-suite.jpg"],
    detailedDescription: `Presidential Suite đại diện cho đỉnh cao của sự sang trọng. Chỗ ở độc quyền này trải dài trên nhiều tầng, bao gồm khu vực sinh hoạt, ăn uống và phòng ngủ riêng, tất cả được thiết kế tinh tế để tối đa hóa sự thanh lịch và tiện nghi.

Suite có bếp riêng hiện đại, cho phép bạn chuẩn bị bữa ăn theo sở thích, cùng khu vực ăn uống riêng lý tưởng cho các buổi tụ họp thân mật. Phòng tắm theo phong cách spa với sàn sưởi ấm, vòi sen hơi nước và các tiện nghi chăm sóc sức khỏe cao cấp.

Hưởng dịch vụ quản gia cá nhân, hỗ trợ ưu tiên từ concierge và quyền truy cập độc quyền vào các tiện ích riêng như lounge trên tầng thượng và nhà hàng cao cấp.`,
  },
  {
    id: 4,
    name: "Phòng Garden",
    type: "Tiêu chuẩn",
    description: "Phòng yên bình với lối ra vườn riêng",
    price: 129,
    image: "/images/luxury-hotel-garden-view.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["Điều hòa", "WiFi", "TV", "Lối ra vườn"],
    rating: 4.3,
    reviews: 95,
    gallery: ["/images/luxury-hotel-garden-view.jpg", "/images/riverside-cottage-hotel.jpg", "/images/business-hotel-room.jpg"],
    detailedDescription: `Tìm thấy sự yên bình trong Phòng Garden của chúng tôi, một không gian thư giãn bao quanh bởi cảnh quan xanh mát. Phòng có lối ra vườn riêng, lý tưởng cho những buổi đi dạo buổi sáng hoặc suy ngẫm buổi tối.

Phòng được thiết kế hài hòa với thiên nhiên và tông màu dịu nhẹ giúp thư giãn. Cửa sổ lớn khung cảnh vườn xinh đẹp, cùng sân hiên rộng rãi lý tưởng cho việc thưởng thức cà phê sáng hoặc thư giãn buổi tối.

Thưởng thức các tiện nghi spa thực vật miễn phí và tham gia các buổi yoga hàng ngày tại pavilion trong vườn.`,
  },
  {
    id: 5,
    name: "Business Executive",
    type: "Tiêu chuẩn",
    description: "Phòng hiện đại cho khách công tác với bàn làm việc",
    price: 179,
    image: "/images/business-hotel-room.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["Điều hòa", "WiFi", "TV", "Bàn làm việc", "Internet tốc độ cao"],
    rating: 4.6,
    reviews: 142,
    gallery: ["/images/business-hotel-room.jpg", "/images/deluxe-suite.jpg", "/images/riverside-cottage-hotel.jpg"],
    detailedDescription: `Được thiết kế dành riêng cho khách công tác hiện đại, Phòng Business Executive kết hợp hiệu quả công việc và tiện nghi. Phòng có khu vực làm việc đầy đủ với internet tốc độ cao, ghế ngồi thoải mái và nhiều cổng sạc cho thiết bị của bạn.

Khu vực làm việc riêng biệt với khu vực ngủ, giúp bạn duy trì ranh giới giữa công việc và nghỉ ngơi. Hỗ trợ hội nghị video và trung tâm kinh doanh đầy đủ sẵn sàng phục vụ nhu cầu chuyên nghiệp của bạn.

Báo chí, cập nhật thời tiết miễn phí và đội ngũ hỗ trợ kinh doanh sẵn sàng hỗ trợ tất cả nhu cầu chuyên môn của bạn.`,
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    type: "Suite",
    description: "Suite lãng mạn hoàn hảo cho cặp đôi với tiện nghi spa",
    price: 349,
    image: "/images/romantic-hotel-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["Điều hòa", "WiFi", "Bồn tắm spa", "Cánh hoa hồng", "Rượu sâm-panh"],
    rating: 4.9,
    reviews: 203,
    gallery: ["/images/romantic-hotel-suite.jpg", "/images/luxury-hotel-ocean-view.jpg", "/images/presidential-suite.jpg"],
    detailedDescription: `Ăn mừng tình yêu trong Honeymoon Suite quyến rũ của chúng tôi, kỳ nghỉ lãng mạn lý tưởng. Không gian thân mật có bồn tắm spa đôi sang trọng, trang trí cánh hoa hồng và một chai rượu sâm-panh cao cấp chào đón bạn.

Mỗi chi tiết được cân nhắc kỹ lưỡng để tạo không khí lãng mạn và độc quyền. Từ ánh sáng ấm áp đến nội thất sang trọng, từ ban công riêng đến phòng tắm bằng đá cẩm thạch với vòi sen mưa, tất cả đều tỏa ra sự tinh tế và say đắm.

Để chuyên gia tình yêu của chúng tôi sắp xếp bất ngờ đặc biệt hoặc bữa sáng champagne trên giường, làm cho kỳ nghỉ của bạn trở nên khó quên.`,
  },
  {
    id: 7,
    name: "Biệt thự Gia đình",
    type: "Villa",
    description: "Biệt thự rộng rãi với nhiều phòng ngủ cho gia đình",
    price: 449,
    image: "/images/family-villa-resort.jpg",
    status: "Booked",
    capacity: 8,
    amenities: ["Điều hòa", "WiFi", "TV", "Hồ bơi", "Bếp nhỏ", "Khu sinh hoạt chung"],
    rating: 4.7,
    reviews: 176,
    gallery: ["/images/family-villa-resort.jpg", "/images/grand-ballroom-suite.jpg", "/images/ocean-view-suite.jpg"],
    detailedDescription: `Biệt thự Gia đình là nơi lý tưởng cho các gia đình và nhóm tìm kiếm không gian, sự riêng tư và các lựa chọn giải trí vô tận. Chỗ ở rộng lớn này có nhiều phòng ngủ, bếp đầy đủ và khu sinh hoạt chung để dành thời gian chất lượng bên nhau.

Hồ bơi riêng và vườn cảnh quan cung cấp không gian ngoài trời, nơi trẻ em có thể chơi an toàn trong khi người lớn thư giãn gần đó. Phòng trò chơi, rạp chiếu phim gia đình và các trò chơi board game đảm bảo không bao giờ nhàm chán.

Đội ngũ concierge gia đình của chúng tôi có thể sắp xếp các hoạt động đặc biệt, dịch vụ trông trẻ và bữa ăn nhóm theo sở thích của gia đình bạn.`,
  },
  {
    id: 8,
    name: "Penthouse",
    type: "Sang trọng",
    description: "Penthouse độc quyền với tầm nhìn thành phố 360 độ",
    price: 799,
    image: "/images/penthouse-luxury-room.jpg",
    status: "Available",
    capacity: 4,
    amenities: ["Điều hòa", "WiFi", "Lối lên tầng thượng", "Skybar", "Thang máy riêng"],
    rating: 4.9,
    reviews: 67,
    gallery: ["/images/penthouse-luxury-room.jpg", "/images/presidential-suite.jpg", "/images/grand-ballroom-suite.jpg"],
    detailedDescription: `Trải nghiệm đỉnh cao sang trọng trong Penthouse độc quyền của chúng tôi. Nằm ở tầng trên cùng, kiệt tác kiến trúc này mang đến tầm nhìn toàn cảnh 360 độ ra đường chân trời thành phố và xa hơn nữa.

Penthouse có bar riêng trên tầng thượng, nhiều khu vực sinh hoạt, bếp của đầu bếp và phòng master với phòng tắm theo phong cách spa. Cửa sổ từ trần đến sàn mang ánh sáng tự nhiên vào không gian mà vẫn đảm bảo sự riêng tư.

Hưởng quyền truy cập độc quyền vào lounge trên tầng thượng, dịch vụ concierge chỉ dành cho khách Penthouse, và tùy chọn tổ chức sự kiện riêng tại skybar cá nhân.`,
  },
  {
    id: 9,
    name: "Riverside Cottage",
    type: "Tiêu chuẩn",
    description: "Nhà nghỉ ven sông duyên dáng với cảnh quan thiên nhiên",
    price: 189,
    image: "/images/riverside-cottage-hotel.jpg",
    status: "Available",
    capacity: 3,
    amenities: ["Điều hòa", "WiFi", "Hiên nhà", "Lối đi thiên nhiên"],
    rating: 4.4,
    reviews: 118,
    gallery: ["/images/riverside-cottage-hotel.jpg", "/images/garden-room.jpg", "/images/business-hotel-room.jpg"],
    detailedDescription: `Trải nghiệm sự duyên dáng của Riverside Cottage, nơi tiện nghi hiện đại hòa quyện với thiên nhiên. Nơi nghỉ ấm cúng này có lối đi thẳng ra các tuyến đường thiên nhiên đẹp và điểm ngắm sông lý tưởng.

Cottage có hiên riêng với ghế bập bênh, lý tưởng để quan sát chim vào buổi sáng hoặc thư giãn buổi tối. Bên trong, nội thất ấm áp và thiết kế rustic-hiện đại tạo cảm giác như ngôi nhà thứ hai.

Hướng dẫn thiên nhiên, bản đồ đi bộ đường dài và nhân viên hoạt động ngoài trời của chúng tôi có thể sắp xếp chuyến câu cá, thuê thuyền hoặc đi dạo thiên nhiên có hướng dẫn.`,
  },
  {
    id: 10,
    name: "Grand Ballroom Suite",
    type: "Suite",
    description: "Suite sang trọng lý tưởng cho sự kiện và lễ hội",
    price: 399,
    image: "/images/grand-ballroom-suite.jpg",
    status: "Available",
    capacity: 50,
    amenities: ["Thiết bị AV", "Dịch vụ ăn uống", "WiFi", "Nhiều phòng"],
    rating: 4.8,
    reviews: 145,
    gallery: ["/images/grand-ballroom-suite.jpg", "/images/presidential-suite.jpg", "/images/ocean-view-suite.jpg"],
    detailedDescription: `Grand Ballroom Suite là địa điểm lý tưởng cho các buổi lễ, hội nghị và sự kiện đặc biệt. Không gian rộng lớn này có thể chứa đến 50 khách và trang bị thiết bị âm thanh-hình ảnh hiện đại.

Nhiều phòng phụ, cấu hình ghế linh hoạt và dịch vụ ăn uống chuyên nghiệp cho phép bạn tùy chỉnh không gian theo nhu cầu. Thiết kế thanh lịch và ánh sáng môi trường tạo ra bầu không khí tinh tế cho mọi dịp.

Đội ngũ quản lý sự kiện sẽ giám sát từng chi tiết để đảm bảo buổi lễ của bạn hoàn hảo và đáng nhớ.`,
  },
];

const GUEST_REVIEWS = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "Tháng 11/2024",
    text: "Kỳ nghỉ tuyệt vời! Phòng vượt xa mọi mong đợi. Nhân viên chu đáo và chuyên nghiệp, mọi chi tiết đều hoàn hảo. Rất đáng để giới thiệu!",
  },
  {
    id: 2,
    author: "Michael Chen",
    rating: 4,
    date: "Tháng 10/2024",
    text: "Vị trí tuyệt vời và chỗ ở thoải mái. Cảnh quan tuyệt đẹp và tiện nghi đáp ứng hoàn hảo nhu cầu của chúng tôi. Chắc chắn sẽ quay lại.",
  },
  {
    id: 3,
    author: "Emma Wilson",
    rating: 5,
    date: "Tháng 10/2024",
    text: "Đây là suite tuần trăng mật của chúng tôi và thật tuyệt vời! Bố trí lãng mạn, bồn tắm spa, mọi thứ đều rất chu đáo. Không biết nói gì hơn ngoài lời cảm ơn!",
  },
];


export default function RoomDetailPage() {
  const params = useParams()
  const roomId = Number(params.id)
  const room = ROOMS_DATA.find((r) => r.id === roomId)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!room) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Không tìm thấy phòng</h1>
          <p className="text-slate-600 mb-8">Phòng bạn tìm kiếm không tồn tại.</p>
          <Link to="/rooms">
            <Button className="bg-blue-600 hover:bg-blue-700">Quay về danh sách phòng</Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (room.gallery?.length ?? 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (room.gallery?.length ?? 1)) % (room.gallery?.length ?? 1))
  }

  const [reviews, setReviews] = useState(GUEST_REVIEWS)
  const [newRating, setNewRating] = useState(0)
  const [newReviewText, setNewReviewText] = useState("")

  const handleSubmitReview = () => {
    if (newRating === 0 || newReviewText.trim() === "") {
      alert("Vui lòng chọn số sao và viết nội dung đánh giá")
      return
    }

    const newReview = {
      id: reviews.length + 1,
      author: "Bạn", // có thể lấy tên user từ auth sau này
      rating: newRating,
      text: newReviewText,
      date: new Date().toLocaleDateString("vi-VN", { month: "long", year: "numeric" }),
    }

    setReviews([newReview, ...reviews])
    setNewRating(0)
    setNewReviewText("")
  }

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Ảnh Hero với Gallery */}
      <section className="relative w-full pt-20">
        <div className="relative h-96 md:h-[500px] overflow-hidden bg-slate-200">
          <img
            src={room.gallery?.[currentImageIndex] || "/placeholder.svg?height=500&width=1200"}
            alt={`${room.name} - Hình ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Nút chuyển ảnh */}
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

        {/* Bộ đếm hình ảnh - GIỮ MÀU ĐEN */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {(room.gallery?.length ?? 1)}
        </div>
      </section>

      {/* Phần chi tiết phòng */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Nội dung chính */}
            <div className="md:col-span-2 text-left">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{room.name}</h1>
                    <p className="text-lg text-slate-600">{room.type}</p>
                  </div>

                  {/* Trạng thái */}
                  <div className="text-right">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {room.status === "Available" ? "Còn phòng" : "Đã đặt"}
                    </span>
                  </div>
                </div>

                {/* Đánh giá */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(room.rating ?? 0)
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

              {/* Tiện nghi phòng */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Tiện nghi phòng</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Sức chứa */}
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Sức chứa</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-teal-600" />
                      <span className="text-lg font-semibold text-slate-900">{room.capacity} khách</span>
                    </div>
                  </div>

                  {/* Giá */}
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Giá</p>
                    <span className="text-2xl font-bold text-teal-600">${room.price}</span>
                    <p className="text-xs text-slate-500">mỗi đêm</p>
                  </div>

                  {/* Internet */}
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Internet</p>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-teal-600" />
                      <span className="font-semibold text-slate-900">WiFi tốc độ cao</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Thông tin về phòng</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed whitespace-pre-line">
                  {room.detailedDescription}
                </div>
              </div>

              {/* Tiện ích */}
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
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-slate-50 rounded-lg p-8 sticky top-24 shadow-sm">
                <div className="text-center mb-8">
                  <p className="text-sm text-slate-600 mb-2">Bắt đầu từ</p>
                  <div className="text-4xl font-bold text-teal-600 mb-1">${room.price}</div>
                  <p className="text-slate-600">mỗi đêm</p>
                </div>

                {/* Nút hành động */}
                <div className="space-y-3 mb-8">
                  {/* Đặt ngay */}
                  <Link to={`/booking/${room.id}`}>
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-md hover:brightness-105 h-12 text-lg">
                      Đặt ngay
                    </Button>
                  </Link>

                  {/* Quay lại danh sách phòng */}
                  <Link to="/rooms">
                    <Button
                      variant="outline"
                      className="w-full border-teal-500 text-teal-500 hover:bg-teal-50 bg-transparent h-12 text-lg"
                    >
                      Quay về danh sách phòng
                    </Button>
                  </Link>
                </div>

                {/* Thông tin nhanh */}
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

      {/* Phần đánh giá khách */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Đánh giá khách</h2>

        {/* Form đánh giá mới */}
        <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
          <h3 className="text-xl font-semibold mb-4">Viết đánh giá của bạn</h3>

          {/* Chọn số sao */}
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                }`}
                onClick={() => setNewRating(star)}
              />
            ))}
          </div>

          {/* Nội dung review */}
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

        {/* Danh sách review */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Header: Rating + Author */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs text-slate-500">{review.date}</span>
              </div>

              {/* Content */}
              <p className="text-slate-700 mb-3">{review.text}</p>

              {/* Author */}
              <p className="font-semibold text-slate-900 text-sm">{review.author}</p>
            </div>
          ))}
        </div>

      </div>
    </section>

      {/* Chân trang */}
      <Footer />
    </div>

  )
}
