"use client"

import { useState } from "react"
import { Link } from 'react-router-dom'
import { Heart, Users, Globe, Award } from "lucide-react"
import Navbar from "../../components/layout/navbar"
import Footer from "../../components/layout/footer"

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("mission")

  const coreValues = [
    {
      icon: Heart,
      title: "Đặt khách hàng lên hàng đầu",
      description: "Mỗi khách hàng được đối xử như thành viên trong gia đình, với sự quan tâm chân thành tại mọi điểm chạm.",
    },
    {
      icon: Users,
      title: "Cộng đồng",
      description: "Chúng tôi xây dựng mối quan hệ bền vững với khách hàng và hỗ trợ cộng đồng địa phương.",
    },
    {
      icon: Globe,
      title: "Bền vững",
      description: "Cam kết thực hành thân thiện với môi trường và bảo vệ hành tinh cho các thế hệ tương lai.",
    },
    {
      icon: Award,
      title: "Xuất sắc",
      description: "Liên tục nỗ lực vượt mong đợi và mang đến dịch vụ đẳng cấp thế giới.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50 to-white">
      {/* Điều hướng */}
      <Navbar />

      {/* Phần Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-teal-100 rounded-full">
            <span className="text-sm font-semibold text-teal-700">Câu chuyện của chúng tôi</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Trải nghiệm Đỉnh cao của{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              Sự Thoải mái
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Trong hơn 25 năm qua, chúng tôi đã tạo ra những trải nghiệm đáng nhớ và những khoảnh khắc lưu giữ suốt đời cho khách hàng.
          </p>
        </div>
      </section>

      {/* Câu chuyện công ty */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Hành trình của chúng tôi</h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Được thành lập năm 1998, Thuong Hotel bắt đầu với tầm nhìn đơn giản: tạo ra một nơi nghỉ dưỡng nơi khách hàng được trải nghiệm sự thoải mái vô song và dịch vụ đẳng cấp thế giới. Từ một khách sạn boutique duy nhất, chúng tôi đã phát triển thành chuỗi khách sạn cao cấp được công nhận toàn cầu về sự xuất sắc.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Hiện nay, chúng tôi điều hành 15 khách sạn sang trọng tại các điểm đến hàng đầu, chào đón hàng triệu khách hàng mỗi năm, đồng thời duy trì cam kết về dịch vụ cá nhân hóa và sự chú ý đến từng chi tiết định hình thương hiệu.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-bold text-teal-600">25+</div>
                  <p className="text-gray-600 text-sm">Năm kinh nghiệm</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal-600">15</div>
                  <p className="text-gray-600 text-sm">Khách sạn toàn cầu</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal-600">2M+</div>
                  <p className="text-gray-600 text-sm">Khách hàng hài lòng</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/luxury-hotel-deluxe-suite.jpg"
                alt="Sảnh khách sạn"
                className="rounded-xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sứ mệnh & Giá trị */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sứ mệnh & Giá trị</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mọi hoạt động của chúng tôi đều được dẫn dắt bởi các giá trị cốt lõi và cam kết tạo ra những trải nghiệm đáng nhớ.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex gap-4 justify-center mb-8">
              <button
                onClick={() => setActiveTab("mission")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeTab === "mission"
                    ? "bg-teal-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600"
                }`}
              >
                Sứ mệnh
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeTab === "vision"
                    ? "bg-teal-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-600"
                }`}
              >
                Tầm nhìn
              </button>
            </div>

            {activeTab === "mission" && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  Cung cấp dịch vụ lưu trú xuất sắc vượt mong đợi, tạo ra những kỷ niệm lâu dài cho mỗi khách hàng đồng thời duy trì tiêu chuẩn cao nhất về dịch vụ, đạo đức và trách nhiệm môi trường.
                </p>
              </div>
            )}
            {activeTab === "vision" && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                  Trở thành thương hiệu khách sạn sang trọng đáng tin cậy nhất toàn cầu, được công nhận về đổi mới, bền vững và sự tận tâm không ngừng đối với sự hài lòng của khách hàng và đội ngũ.
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-center group"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-teal-100 rounded-full group-hover:bg-teal-600 transition">
                      <Icon className="w-6 h-6 text-teal-600 group-hover:text-white transition" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Thông tin tác giả */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Thông tin tác giả</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Website này được thực hiện bởi <strong>Hoài Thương</strong>, sinh viên <strong>Đại học Nông Lâm</strong>.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Trải nghiệm dịch vụ sang trọng chưa từng có
          </h2>
          <p className="text-lg text-teal-50 mb-8 leading-relaxed">
            Khám phá nơi nghỉ dưỡng hoàn hảo của bạn. Xem các khách sạn đẳng cấp thế giới và đặt phòng ngay hôm nay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rooms"
              className="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all inline-block"
            >
              Xem phòng
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-teal-700 text-white font-bold rounded-lg hover:bg-teal-800 hover:shadow-lg transition-all inline-block border-2 border-white"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
