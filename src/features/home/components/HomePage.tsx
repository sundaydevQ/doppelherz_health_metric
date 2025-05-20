import React, { useState } from "react";
import {
  ResponsiveGrid,
  ResponsiveCard,
  Button,
  DoctorIllustration,
  HealthTrackingIllustration,
  PersonalInsightsIllustration,
  ProgressReportsIllustration,
} from "../../../shared/components";

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
      {/* Mobile and Small Tablets View (< 1024px) */}
      <div className="lg:hidden flex flex-col min-h-screen bg-gradient-to-br from-white to-[#f7f5ff] relative">
        {/* Add space at the top for the navbar */}
        <div className="h-16"></div>

        {/* Main content section with illustration */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8 pb-16 mt-8">
          {/* Illustration container - Responsive sizing */}
          <div className="rounded-3xl w-full max-w-[280px] sm:max-w-xs aspect-square bg-gradient-to-b from-[#8c62e3] to-[#6942af] flex items-center justify-center mb-6 sm:mb-8 shadow-lg">
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

          {/* Text content - Improve readability on small screens */}
          <h1 className="text-[#6942af] text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
            {slides[currentSlide].title}
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-700 mb-6 sm:mb-8 max-w-xs sm:max-w-sm md:max-w-md">
            {slides[currentSlide].description}
          </p>

          {/* Pagination dots */}
          <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full cursor-pointer ${
                  currentSlide === index ? "bg-[#6942af]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          {/* Navigation button - Responsive width */}
          <div className="w-full max-w-[280px] sm:max-w-xs">
            <Button
              href="/survey"
              className="inline-flex items-center justify-center w-full"
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

          {/* Optional tablet view content for medium screens */}
          <div className="hidden md:flex md:flex-col md:mt-10 lg:hidden">
            <h2 className="text-2xl font-bold text-[#6942af] text-center mb-8">
              Tính năng chính
            </h2>
            <ResponsiveGrid columns={{ md: 3 }} gap="gap-4">
              {features.map((feature, index) => (
                <ResponsiveCard
                  key={index}
                  className="p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="h-16 mb-3 text-[#6942af]">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </ResponsiveCard>
              ))}
            </ResponsiveGrid>
          </div>
        </div>
      </div>

      {/* Desktop View (≥ 1024px) */}
      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-white to-[#f7f5ff]">
        {/* Add space at the top for the navbar */}
        <div className="h-16"></div>

        {/* Hero section - Improved responsive sizing */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 gap-8 lg:gap-12">
          {/* Left content */}
          <div className="lg:w-1/2 lg:pr-4">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#6942af] mb-4 lg:mb-6">
              Doppelherz Health Metric
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 lg:mb-10 max-w-xl">
              Cân bằng nội tiết tố, tối ưu hóa sức khỏe toàn diện. Giải pháp
              theo dõi sức khỏe thông minh giúp bạn có cuộc sống khỏe mạnh hơn.
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <Button href="/survey" variant="solid" className="flex-shrink-0">
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
              <Button href="/" variant="bordered" className="flex-shrink-0">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Right image - Responsive sizing */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="rounded-3xl w-[340px] h-[340px] lg:w-[380px] lg:h-[380px] xl:w-[400px] xl:h-[400px] bg-gradient-to-b from-[#8c62e3] to-[#6942af] flex items-center justify-center shadow-xl">
              <DoctorIllustration className="w-4/5 h-4/5" />
            </div>
          </div>
        </div>

        {/* Features section - Responsive padding and sizing */}
        <div className="bg-white py-12 lg:py-16">
          <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#6942af] text-center mb-8 lg:mb-12">
              Tính năng chính
            </h2>
            <ResponsiveGrid columns={{ lg: 3 }} gap="gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <ResponsiveCard
                  key={index}
                  className="p-6 lg:p-8 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="h-20 lg:h-24 mb-5 lg:mb-6 text-[#6942af]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-2 lg:mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600">
                    {feature.description}
                  </p>
                </ResponsiveCard>
              ))}
            </ResponsiveGrid>
          </div>
        </div>

        {/* CTA section - Responsive padding and layout */}
        <div className="py-12 lg:py-16 px-6 lg:px-8 max-w-6xl xl:max-w-7xl mx-auto">
          <div className="bg-[#6942af] rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                Sẵn sàng bắt đầu hành trình sức khỏe của bạn?
              </h2>
              <p className="text-lg lg:text-xl text-purple-200">
                Theo dõi, phân tích và cải thiện chỉ số sức khỏe của bạn với
                Doppelherz.
              </p>
            </div>
            <Button
              href="/survey"
              variant="solid"
              color="secondary"
              className="font-bold whitespace-nowrap"
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
