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
    name: "Deluxe Room",
    type: "Standard",
    description: "Comfortable room with city views and modern amenities",
    price: 149,
    image: "/luxury-hotel-deluxe-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "TV", "Mini Bar"],
    rating: 4.5,
    reviews: 128,
    gallery: ["/luxury-hotel-deluxe-suite.jpg", "/business-hotel-room.jpg", "/riverside-cottage-hotel.jpg"],
    detailedDescription: `Experience the epitome of comfort in our Deluxe Room. This thoughtfully designed space combines modern elegance with warm hospitality. Each room features premium bedding, a state-of-the-art entertainment system, and floor-to-ceiling windows showcasing stunning city views.

Our Deluxe Rooms are perfect for both business travelers and leisure guests seeking a perfect balance of luxury and affordability. The room includes a spacious work desk, high-speed WiFi, and a comfortable seating area where you can relax after a long day.

Wake up to complimentary coffee and tea service, with room service available around the clock. The marble bathroom is equipped with premium toiletries, a rainfall shower, and heated towel racks for your ultimate comfort.`,
  },
  {
    id: 2,
    name: "Ocean View Suite",
    type: "Suite",
    description: "Premium suite overlooking the ocean with private balcony",
    price: 249,
    image: "/luxury-hotel-ocean-view.jpg",
    status: "Available",
    capacity: 4,
    amenities: ["AC", "WiFi", "TV", "Jacuzzi", "Terrace"],
    rating: 4.8,
    reviews: 256,
    gallery: ["/luxury-hotel-ocean-view.jpg", "/romantic-hotel-suite.jpg", "/family-villa-resort.jpg"],
    detailedDescription: `Immerse yourself in unparalleled luxury with our Ocean View Suite. This magnificent space offers breathtaking panoramic views of the ocean from your private balcony, creating the perfect setting for an unforgettable stay.

The suite features a spacious living area with plush furnishings, a separate bedroom with a king-size bed, and a luxurious marble bathroom with a Jacuzzi tub. Every detail has been carefully curated to provide maximum comfort and relaxation.

Our concierge team is at your service 24/7, ready to arrange special experiences, dining reservations, or any other requests to make your stay truly memorable.`,
  },
  {
    id: 3,
    name: "Presidential Suite",
    type: "Luxury",
    description: "Ultimate luxury with separate living and dining areas",
    price: 599,
    image: "/luxury-hotel-presidential-suite.jpg",
    status: "Booked",
    capacity: 6,
    amenities: ["AC", "WiFi", "TV", "Spa", "Chef Kitchen", "Butler Service"],
    rating: 5.0,
    reviews: 89,
    gallery: ["/luxury-hotel-presidential-suite.jpg", "/penthouse-luxury-room.jpg", "/grand-ballroom-suite.jpg"],
    detailedDescription: `The Presidential Suite represents the pinnacle of luxury hospitality. This exclusive accommodation spans multiple levels, featuring separate living, dining, and bedroom areas, each meticulously designed for maximum elegance and comfort.

The suite includes a state-of-the-art chef's kitchen, allowing you to prepare meals to your preferences, along with private dining facilities perfect for intimate gatherings. The spa-inspired bathroom features heated floors, a steam shower, and premium wellness amenities.

Enjoy personalized butler service, priority concierge assistance, and exclusive access to our private facilities including a rooftop lounge and premium restaurant.`,
  },
  {
    id: 4,
    name: "Garden Room",
    type: "Standard",
    description: "Serene room with access to private gardens",
    price: 129,
    image: "/luxury-hotel-garden-view.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "TV", "Garden Access"],
    rating: 4.3,
    reviews: 95,
    gallery: ["/luxury-hotel-garden-view.jpg", "/riverside-cottage-hotel.jpg", "/business-hotel-room.jpg"],
    detailedDescription: `Find tranquility in our Garden Room, a serene sanctuary surrounded by lush landscaping and pristine nature. This room offers direct access to our private gardens, perfect for early morning walks or quiet evening contemplation.

The room is thoughtfully designed with natural elements and calming colors that promote relaxation and well-being. Large windows frame the beautiful garden views, while the spacious terrace provides an ideal spot for morning coffee or evening relaxation.

Enjoy the complimentary botanical spa amenities and join our daily yoga sessions in the garden pavilion.`,
  },
  {
    id: 5,
    name: "Business Executive",
    type: "Standard",
    description: "Modern room designed for business travelers with work desk",
    price: 179,
    image: "/business-hotel-room.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "TV", "Work Desk", "High-Speed Internet"],
    rating: 4.6,
    reviews: 142,
    gallery: ["/business-hotel-room.jpg", "/deluxe-suite.jpg", "/riverside-cottage-hotel.jpg"],
    detailedDescription: `Designed specifically for the modern business traveler, our Business Executive Room combines productivity with comfort. The room features a full work station with high-speed internet, ergonomic seating, and multiple charging ports for your devices.

The dedicated work area is separate from the sleeping area, allowing you to maintain a professional boundary between work and rest. Video conferencing capabilities and a fully stocked business center are available for your convenience.

Complimentary newspapers, weather updates, and our executive business support team are ready to assist with all your professional needs.`,
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    type: "Suite",
    description: "Romantic suite perfect for couples with spa amenities",
    price: 349,
    image: "/romantic-hotel-suite.jpg",
    status: "Available",
    capacity: 2,
    amenities: ["AC", "WiFi", "Spa Tub", "Rose Petals", "Champagne"],
    rating: 4.9,
    reviews: 203,
    gallery: ["/romantic-hotel-suite.jpg", "/luxury-hotel-ocean-view.jpg", "/presidential-suite.jpg"],
    detailedDescription: `Celebrate love in our enchanting Honeymoon Suite, the perfect romantic getaway. This intimate setting features a luxurious spa tub for two, rose petal arrangements, and a bottle of premium champagne to welcome you.

Every element has been carefully considered to create an atmosphere of romance and exclusivity. From the ambient lighting to the plush furnishings, from the private balcony to the marble bathroom with rain shower, everything speaks of sophistication and passion.

Let our romance specialist arrange a special surprise or champagne breakfast in bed to make your celebration unforgettable.`,
  },
  {
    id: 7,
    name: "Family Villa",
    type: "Villa",
    description: "Spacious villa with multiple bedrooms for family stays",
    price: 449,
    image: "/family-villa-resort.jpg",
    status: "Booked",
    capacity: 8,
    amenities: ["AC", "WiFi", "TV", "Pool", "Kitchenette", "Living Area"],
    rating: 4.7,
    reviews: 176,
    gallery: ["/family-villa-resort.jpg", "/grand-ballroom-suite.jpg", "/ocean-view-suite.jpg"],
    detailedDescription: `The Family Villa is an ideal retreat for families and groups seeking space, privacy, and endless entertainment options. This expansive accommodation features multiple bedrooms, a full kitchen, and common living areas designed for quality time together.

The private pool and landscaped garden provide outdoor recreation space where children can play safely while adults relax nearby. Game rooms, home theater systems, and various board games ensure there's never a dull moment.

Our family concierge can arrange special activities, babysitting services, and group dining experiences tailored to your family's preferences.`,
  },
  {
    id: 8,
    name: "Penthouse",
    type: "Luxury",
    description: "Exclusive penthouse with 360-degree city views",
    price: 799,
    image: "/penthouse-luxury-room.jpg",
    status: "Available",
    capacity: 4,
    amenities: ["AC", "WiFi", "Rooftop Access", "Skybar", "Private Elevator"],
    rating: 4.9,
    reviews: 67,
    gallery: ["/penthouse-luxury-room.jpg", "/presidential-suite.jpg", "/grand-ballroom-suite.jpg"],
    detailedDescription: `Ascend to new heights of luxury in our exclusive Penthouse. Located on the top floor, this architectural masterpiece offers 360-degree panoramic views of the city skyline and beyond.

The penthouse features a private rooftop bar, multiple living spaces, a chef's kitchen, and a master suite with a spa-inspired bathroom. Floor-to-ceiling windows flood the space with natural light while maintaining complete privacy.

Enjoy exclusive access to our private rooftop lounge, concierge services reserved only for penthouse guests, and the option to host exclusive events in your personal skybar.`,
  },
  {
    id: 9,
    name: "Riverside Cottage",
    type: "Standard",
    description: "Charming cottage with riverside views and nature access",
    price: 189,
    image: "/riverside-cottage-hotel.jpg",
    status: "Available",
    capacity: 3,
    amenities: ["AC", "WiFi", "Porch", "Nature Trail Access"],
    rating: 4.4,
    reviews: 118,
    gallery: ["/riverside-cottage-hotel.jpg", "/garden-room.jpg", "/business-hotel-room.jpg"],
    detailedDescription: `Experience the charm of our Riverside Cottage, where modern comfort meets natural beauty. This cozy retreat offers direct access to scenic nature trails and prime riverside viewing spots.

The cottage features a private porch with rocking chairs, perfect for morning bird watching or evening relaxation. Inside, the warm furnishings and rustic-modern design create an inviting atmosphere that feels like home away from home.

Complimentary nature guides, hiking maps, and our outdoor activity coordinator can arrange fishing trips, boat rentals, or guided nature walks.`,
  },
  {
    id: 10,
    name: "Grand Ballroom Suite",
    type: "Suite",
    description: "Sophisticated suite ideal for events and celebrations",
    price: 399,
    image: "/grand-ballroom-suite.jpg",
    status: "Available",
    capacity: 50,
    amenities: ["AV Equipment", "Catering", "WiFi", "Multiple Rooms"],
    rating: 4.8,
    reviews: 145,
    gallery: ["/grand-ballroom-suite.jpg", "/presidential-suite.jpg", "/ocean-view-suite.jpg"],
    detailedDescription: `The Grand Ballroom Suite is the ultimate venue for celebrations, conferences, and special events. This magnificent space can accommodate up to 50 guests and features state-of-the-art audio-visual equipment.

Multiple break-out rooms, flexible seating configurations, and professional catering services allow you to customize the space exactly to your needs. The elegant design and ambient lighting create an sophisticated atmosphere for any occasion.

Our event management team will personally oversee every detail to ensure your celebration is flawless and memorable.`,
  },
]

const GUEST_REVIEWS = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "November 2024",
    text: "Absolutely exceptional stay! The room exceeded all expectations. The staff was attentive and professional, and every detail was perfect. Highly recommended!",
  },
  {
    id: 2,
    author: "Michael Chen",
    rating: 4,
    date: "October 2024",
    text: "Great location and comfortable accommodations. The views were stunning and the amenities were exactly what we needed. Would definitely return.",
  },
  {
    id: 3,
    author: "Emma Wilson",
    rating: 5,
    date: "October 2024",
    text: "This was our honeymoon suite and it was pure magic! The romantic setup, the spa tub, everything was incredibly thoughtful. Can't thank you enough!",
  },
] 

export default function RoomDetailPage() {
  const params = useParams()
  const roomId = Number(params.id)
  const room = ROOMS_DATA.find((r) => r.id === roomId)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!room) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Room Not Found</h1>
          <p className="text-slate-600 mb-8">The room you're looking for doesn't exist.</p>
          <Link to="/rooms">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Rooms</Button>
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

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Image with Gallery */}
      <section className="relative w-full">
        <div className="relative h-96 md:h-[500px] overflow-hidden bg-slate-200">
          <img
            src={room.gallery?.[currentImageIndex] || "/placeholder.svg?height=500&width=1200"}
            alt={`${room.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />    

          {(room.gallery?.length ?? 0) > 1 && (

            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition z-10"
              >
                <ChevronLeft className="w-6 h-6 text-slate-900" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition z-10"
              >
                <ChevronRight className="w-6 h-6 text-slate-900" />
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {(room.gallery?.length ?? 1)}
        </div>
      </section>

      {/* Room Details Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 text-left">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2">{room.name}</h1>
                    <p className="text-lg text-slate-600">{room.type}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        room.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                </div>

                {/* Rating */}
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
                  <span className="text-slate-600">({room.reviews} reviews)</span>
                </div>
              </div>

              {/* Room Features */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Room Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Capacity</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-lg font-semibold text-slate-900">{room.capacity} Guests</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Price</p>
                    <span className="text-2xl font-bold text-blue-600">${room.price}</span>
                    <p className="text-xs text-slate-500">per night</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Internet</p>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-900">High-Speed WiFi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">About This Room</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed whitespace-pre-line">
                  {room.detailedDescription}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-slate-50 rounded-lg p-8 sticky top-24">
                <div className="text-center mb-8">
                  <p className="text-sm text-slate-600 mb-2">Starting From</p>
                  <div className="text-4xl font-bold text-blue-600 mb-1">${room.price}</div>
                  <p className="text-slate-600">per night</p>
                </div>

                <div className="space-y-3 mb-8">
                  <Link to={`/booking/${room.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg">Book Now</Button>
                  </Link>
                  <Link to="/rooms">
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent h-12"
                    >
                      Back to Rooms
                    </Button>
                  </Link>
                </div>

                {/* Quick Facts */}
                <div className="space-y-4 pt-8 border-t border-slate-200 text-left">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Guest Capacity</p>
                    <p className="text-slate-600">{room.capacity} guests maximum</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Guest Reviews</p>
                    <p className="text-slate-600">{room.reviews} verified reviews</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Room Type</p>
                    <p className="text-slate-600">{room.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Reviews Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-12">Guest Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {GUEST_REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">{review.text}</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="font-semibold text-slate-900 text-sm">{review.author}</p>
                  <p className="text-xs text-slate-500">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
