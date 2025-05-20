import React, { useState } from "react";
import {
  ResponsiveGrid,
  ResponsiveCard,
} from "../components/common/ResponsiveContainer";
import Button from "../components/common/Button";
import DoctorIllustration from "../components/common/DoctorIllustration";
import HealthTrackingIllustration from "../components/common/HealthTrackingIllustration";
import PersonalInsightsIllustration from "../components/common/PersonalInsightsIllustration";
import ProgressReportsIllustration from "../components/common/ProgressReportsIllustration";

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Onboarding slides data
  const slides = [
    {
      title: "Doppelherz Health Metric",
      description: "Cân bằng nội tiết tố, tối ưu hóa sức khỏe toàn diện.",
      image: "doctor", // This will be replaced with actual image
    },
    {
      title: "Theo dõi sức khỏe",
      description: "Giám sát các chỉ số sức khỏe của bạn một cách dễ dàng.",
      image: "health-tracking",
    },
    {
      title: "Phân tích cá nhân hóa",
      description:
        "Nhận các khuyến nghị sức khỏe dựa trên hồ sơ riêng của bạn.",
      image: "personal-insights",
    },
    {
      title: "Báo cáo tiến độ",
      description: "Xem báo cáo chi tiết về hành trình sức khỏe của bạn.",
      image: "progress-reports",
    },
  ];
  // Features data - for tablet and desktop views
  const features = [
    {
      title: "Theo dõi sức khỏe",
      description: "Giám sát các chỉ số sức khỏe của bạn một cách dễ dàng.",
      icon: <HealthTrackingIllustration />,
    },
    {
      title: "Phân tích cá nhân hóa",
      description:
        "Nhận các khuyến nghị sức khỏe dựa trên hồ sơ riêng của bạn.",
      icon: <PersonalInsightsIllustration />,
    },
    {
      title: "Báo cáo tiến độ",
      description: "Xem báo cáo chi tiết về hành trình sức khỏe của bạn.",
      icon: <ProgressReportsIllustration />,
    },
  ];
  // These functions could be used for navigation controls if needed later
  // const handleNextSlide = () => {
  //   setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  // };
  //
  // const handlePrevSlide = () => {
  //   setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  // };

  return (
    <div className="flex flex-col">
      {" "}
      {/* Mobile View */}
      <div className="lg:hidden flex flex-col min-h-screen bg-[#f7f5ff] relative">
        {/* Add space at the top for the navbar */}
        <div className="h-16"></div>

        {/* Main content section with illustration */}
        <div className="flex-grow flex flex-col items-center justify-center px-6 pb-16 mt-8">
          {/* Image container */}
          <div className="rounded-3xl w-full max-w-xs aspect-square bg-gradient-to-b from-[#8c62e3] to-[#6942af] flex items-center justify-center mb-8">
            <div className="flex items-center justify-center rounded-xl overflow-hidden w-4/5 h-4/5">
              {currentSlide === 0 && (
                <DoctorIllustration className="w-full h-full" />
              )}
              {currentSlide === 1 && (
                <HealthTrackingIllustration className="w-full h-full" />
              )}
              {currentSlide === 2 && (
                <PersonalInsightsIllustration className="w-full h-full" />
              )}
              {currentSlide === 3 && (
                <ProgressReportsIllustration className="w-full h-full" />
              )}
            </div>
          </div>
          {/* Slide content */}
          <h1 className="text-[#6942af] text-2xl font-bold text-center mb-2">
            {slides[currentSlide].title}
          </h1>
          <p className="text-center text-gray-700 mb-8 max-w-xs">
            {slides[currentSlide].description}
          </p>
          {/* Pagination dots */}
          <div className="flex gap-3 mb-16">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  currentSlide === index ? "bg-[#6942af]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          {/* Navigation button */}
          <div className="w-full max-w-xs">
            <Button
              href="/survey"
              className="inline-flex items-center justify-center w-full rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6942af] disabled:pointer-events-none disabled:opacity-50 bg-[#6942af] text-white hover:bg-[#5a3894] h-12 px-8 py-4 text-xl"
            >
              Bắt đầu
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
      {/* Tablet View */}
      <div className="hidden lg:hidden md:flex flex-col min-h-screen bg-gradient-to-br from-white to-[#f7f5ff]">
        {/* Add space at the top for the navbar */}
        <div className="h-16"></div>

        {/* Main content */}
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 p-8">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="rounded-3xl w-80 h-80 bg-gradient-to-b from-[#8c62e3] to-[#6942af] flex items-center justify-center">
              <DoctorIllustration className="w-4/5 h-4/5" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-[#6942af] text-3xl font-bold mb-4">
              Doppelherz Health Metric
            </h1>
            <p className="text-gray-700 mb-8 text-lg max-w-md">
              Cân bằng nội tiết tố, tối ưu hóa sức khỏe toàn diện. Theo dõi sức
              khỏe, nhận phân tích cá nhân hóa và xem báo cáo tiến độ chi tiết.
            </p>
            <Button href="/survey" variant="solid" color="primary" size="lg">
              Bắt đầu ngay
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Button>
          </div>
        </div>

        {/* Features section */}
        <div className="p-8 pb-12">
          <h2 className="text-2xl font-bold text-[#6942af] text-center mb-8">
            Tính năng chính
          </h2>
          <ResponsiveGrid columns={{ md: 3 }} gap="gap-6">
            {features.map((feature, index) => (
              <ResponsiveCard
                key={index}
                className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="h-20 mb-4 text-[#6942af]">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </ResponsiveCard>
            ))}
          </ResponsiveGrid>
        </div>
      </div>
      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-white to-[#f7f5ff]">
        {/* Add space at the top for the navbar */}
        <div className="h-16"></div>

        {/* Hero section */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-16 gap-12">
          {/* Left content */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#6942af] mb-6">
              Doppelherz Health Metric
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-lg">
              Cân bằng nội tiết tố, tối ưu hóa sức khỏe toàn diện. Giải pháp
              theo dõi sức khỏe thông minh giúp bạn có cuộc sống khỏe mạnh hơn.
            </p>
            <div className="flex gap-6">
              <Button href="/survey" variant="solid" size="lg">
                Bắt đầu ngay
                <span className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Button>
              <Button href="/" variant="bordered" size="lg">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="rounded-3xl w-[400px] h-[400px] bg-gradient-to-b from-[#8c62e3] to-[#6942af] flex items-center justify-center">
              <DoctorIllustration className="w-4/5 h-4/5" />
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-[#6942af] text-center mb-12">
              Tính năng chính
            </h2>
            <ResponsiveGrid columns={{ lg: 3 }} gap="gap-8">
              {features.map((feature, index) => (
                <ResponsiveCard
                  key={index}
                  className="p-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="h-24 mb-6 text-[#6942af]">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600">{feature.description}</p>
                </ResponsiveCard>
              ))}
            </ResponsiveGrid>
          </div>
        </div>

        {/* CTA section */}
        <div className="py-16 px-8 max-w-7xl mx-auto">
          <div className="bg-[#6942af] rounded-3xl p-12 flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">
                Sẵn sàng bắt đầu hành trình sức khỏe của bạn?
              </h2>
              <p className="text-xl text-purple-200">
                Theo dõi, phân tích và cải thiện chỉ số sức khỏe của bạn với
                Doppelherz.
              </p>
            </div>
            <Button
              href="/survey"
              variant="solid"
              color="secondary" // Assuming secondary is white or light for dark backgrounds
              size="lg"
              className="font-bold"
            >
              Bắt đầu ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
