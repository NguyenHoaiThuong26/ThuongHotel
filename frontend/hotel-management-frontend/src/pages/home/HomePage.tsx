"use client"

import { useState } from "react"
import { Link } from 'react-router-dom'
import {
  Star,
  Wifi,
  Utensils,
  Dumbbell,
  Car,
  Droplets,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"
import { Button } from "../../components/ui/button"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const rooms = [
    {
      id: 1,
      name: "Deluxe Suite",
      price: "$299",
      image: "/luxury-hotel-deluxe-suite.jpg",
      description: "Spacious suite with city views and modern amenities",
    },
    {
      id: 2,
      name: "Ocean View Room",
      price: "$349",
      image: "/luxury-hotel-ocean-view.jpg",
      description: "Premium room overlooking the ocean with private balcony",
    },
    {
      id: 3,
      name: "Presidential Suite",
      price: "$599",
      image: "/luxury-hotel-presidential-suite.jpg",
      description: "Ultimate luxury with separate living and dining areas",
    },
    {
      id: 4,
      name: "Garden Room",
      price: "$249",
      image: "/luxury-hotel-garden-view.jpg",
      description: "Serene room with access to our private gardens",
    },
  ]

  const amenities = [
    { id: 1, name: "Pool", icon: Droplets },
    { id: 2, name: "Restaurant", icon: Utensils },
    { id: 3, name: "Fitness Center", icon: Dumbbell },
    { id: 4, name: "Free WiFi", icon: Wifi },
    { id: 5, name: "Valet Parking", icon: Car },
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Exceptional service and breathtaking views. A truly unforgettable experience.",
      image: "/profile-woman.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "The attention to detail is remarkable. Every moment felt special.",
      image: "/profile-man.jpg",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 5,
      comment: "Luxurious accommodations paired with outstanding hospitality.",
      image: "/profile-woman-2.jpg",
    },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/luxury-hotel-lobby-grand.jpg" alt="Hero background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 animate-fadeInUp">Welcome to Luxury Hotels</h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-100 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Experience comfort, elegance, and world-class service in our distinguished establishment.
          </p>
          <Link to="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg animate-fadeInUp animation-delay-400">
              Book Your Stay
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/luxury-hotel-room-interior.jpg"
                alt="Hotel room"
                className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">About Our Hotel</h2>
              <p className="text-lg text-slate-600 mb-4">
                Established in 1985, Luxury Hotels has been the premier destination for discerning travelers seeking
                exceptional experiences. Our commitment to excellence spans five decades of refined hospitality.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                With 250 beautifully appointed rooms, world-class dining, and comprehensive amenities, we provide an
                unparalleled sanctuary of sophistication and comfort. Every detail is crafted to ensure your utmost
                satisfaction.
              </p>
              <Link to="/login">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section id="rooms" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 text-center mb-4">Featured Rooms</h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
            Discover our collection of elegantly designed accommodations, each offering unique views and premium
            amenities.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300"
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{room.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{room.price}</span>
                    <Button className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 text-center mb-4">
            World-Class Amenities
          </h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
            Indulge in our comprehensive range of facilities designed for your comfort and relaxation.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {amenities.map((amenity) => {
              const IconComponent = amenity.icon
              return (
                <div
                  key={amenity.id}
                  className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{amenity.name}</h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 text-center mb-4">
            Guest Testimonials
          </h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
            Hear from our distinguished guests about their unforgettable experiences at Luxury Hotels.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{review.name}</h3>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{review.comment}"</p>
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
