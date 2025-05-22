import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../../shared/hooks"; // Import useAuth
import {
  // ResponsiveGrid, // No longer used
  // ResponsiveCard, // No longer used
  Button,
  DoctorIllustration,
  // HealthTrackingIllustration, // No longer used
  // PersonalInsightsIllustration, // No longer used
  // ProgressReportsIllustration, // No longer used
} from "../../../shared/components";
import Carousel from "../../../shared/components/Carousel";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react"; // Removed Typography, assuming it's not a direct export or will be handled by standard HTML tags

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth(); // Use the auth context
  const [currentSlide, setCurrentSlide] = useState(0);

  // Onboarding slides data - Add illustration components directly
  const slides = [
    {
      title: "Doppelherz Health Metric",
      description: "Cân bằng nội tiết tố, tối ưu hóa sức khỏe toàn diện.",
      illustration: "src/assets/images/slide1.png",
    },
    {
      title: "Theo dõi sức khỏe",
      description: "Giám sát các chỉ số sức khỏe của bạn một cách dễ dàng.",
      illustration: "src/assets/images/slide2.png",
    },
    {
      title: "Phân tích cá nhân hóa",
      description:
        "Nhận các khuyến nghị sức khỏe dựa trên hồ sơ riêng của bạn.",
      illustration: "src/assets/images/slide3.png",
    },
    {
      title: "Báo cáo tiến độ",
      description: "Xem báo cáo chi tiết về hành trình sức khỏe của bạn.",
      illustration: "src/assets/images/slide4.png",
    },
  ];

  // Updated Features data for the new layout
  const features = [
    {
      title: "Theo dõi sức khỏe",
      description: "Theo dõi sức khỏe của bạn một cách dễ dàng và hiệu quả.",
      iconPlaceholder: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      ), // Placeholder for icon
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      blobColor: "bg-blue-200",
    },
    {
      title: "Phân tích cá nhân hóa",
      description:
        "Nhận các khuyến nghị sức khỏe dựa trên hồ sơ riêng của bạn.",
      iconPlaceholder: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      ), // Placeholder for icon
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      blobColor: "bg-green-200",
    },
    {
      title: "Báo cáo tiến độ",
      description: "Xem báo cáo chi tiết về hành trình sức khỏe của bạn.",
      iconPlaceholder: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      ), // Placeholder for icon
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      blobColor: "bg-yellow-200",
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

  const handleStartNavigation = () => {
    if (auth?.isAuthenticated) {
      navigate({ to: "/survey" });
    } else {
      navigate({ to: "/login" });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Mobile and Small Tablets View (< 1024px) */}
      <div className="lg:hidden flex flex-col min-h-screen bg-gradient-to-br from-white to-[#f7f5ff] relative">
        {/* Main content section with carousel */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8 pb-16 mt-8">
          {/* Carousel container - Responsive sizing */}
          <div className="w-full max-w-xs mb-6 sm:mb-8">
            <Carousel
              items={slides.map((slide, index) => (
                <div
                  key={index}
                  className="rounded-3xl w-full aspect-square bg-gradient-to-b from-[#8c62e3] to-[#6942af] flex items-center justify-center overflow-hidden"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={slide.illustration}
                      alt={slide.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
              onSlideChange={setCurrentSlide}
              initialIndex={currentSlide}
              loop={true}
              autoplay={true} // Keeping user's preference
              autoplayInterval={5000}
              showDots={false} // Keeping user's preference
              itemClassName="flex items-center justify-center"
            />
          </div>
          {/* Text content - Improve readability on small screens */}
          <h1 className="text-[#6942af] text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
            {slides[currentSlide].title}
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-700 mb-6 sm:mb-8 max-w-xs sm:max-w-sm md:max-w-md">
            {slides[currentSlide].description}
          </p>
          {/* Custom Pagination dots for the Carousel */}
          <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                  currentSlide === index ? "bg-[#6942af]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          {/* Navigation button - Responsive width */}
          <div className="w-full max-w-[280px] sm:max-w-xs">
            <Button
              onPress={handleStartNavigation} // Updated to onClick and new handler
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
        </div>
      </div>
      {/* Desktop View (≥ 1024px) */}
      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-white to-[#f7f5ff]">
        {/* Hero section - Improved responsive sizing */}
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16 gap-8 lg:gap-12">
          {/* Left content */}
          <div className="lg:w-1/2 lg:pr-4">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">
              Doppelherz Health Metric
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 lg:mb-10 max-w-xl">
              Cân bằng nội tiết tố, tối ưu hóa sức khỏe toàn diện. Giải pháp
              theo dõi sức khỏe thông minh giúp bạn có cuộc sống khỏe mạnh hơn.
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-6">
              <Button onPress={handleStartNavigation} className="flex-shrink-0">
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
        </div>{" "}
        {/* Features section - Responsive padding and sizing */}
        <div className="bg-white py-12 lg:py-24">
          <div
            id="features"
            className="max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-4">
              <span className="text-gray-800">Tính năng chính</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12 lg:mt-16 relative">
              {/* Decorative lines/arrows (simplified) */}
              <svg
                className="hidden md:block absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-1/4 h-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 25 Q 25 0, 50 25 T 100 25"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
              <svg
                className="hidden md:block absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 w-1/4 h-auto text-gray-300 transform scale-x-[-1]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 100 50"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 25 Q 25 50, 50 25 T 100 25"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>

              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center p-6"
                >
                  <div
                    className={`absolute -top-8 -left-4 w-24 h-24 ${feature.blobColor} rounded-full opacity-30 blur-xl`}
                  ></div>
                  <div
                    className={`absolute -top-4 -right-4 w-20 h-20 ${feature.blobColor} rounded-full opacity-20 blur-lg`}
                  ></div>

                  <div className="relative z-10">
                    <Card
                      className={`w-full max-w-sm bg-white shadow-xl rounded-xl p-6 mt-[-20px] border border-gray-200 relative overflow-hidden ${feature.bgColor} bg-opacity-20`}
                    >
                      <CardHeader className="bg-transparent w-full">
                        {/* Removed floated prop */}
                        <div className="flex items-center justify-center mb-3 w-full">
                          <span className="text-sm text-gray-500">
                            {feature.iconPlaceholder}
                          </span>
                          {/* <h6 className="font-semibold text-gray-800">
                            {feature.title}
                          </h6> */}
                        </div>
                      </CardHeader>
                      <CardBody className="p-0">
                        {/* <p className="text-sm text-gray-600">
                          {feature.description}
                        </p> */}

                        <h6 className="text-center font-semibold text-gray-800">
                          {feature.title}
                        </h6>
                      </CardBody>
                      {feature.title === "Theo dõi sức khỏe" && (
                        <CardFooter className="pt-4 mt-4">
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </CardFooter>
                      )}
                      {feature.title === "Phân tích cá nhân hóa" && (
                        <CardFooter className="pt-4 mt-4 flex justify-around">
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </CardFooter>
                      )}
                      {feature.title === "Báo cáo tiến độ" && (
                        <CardFooter className="pt-4 mt-4 space-y-2">
                          <p className="text-sm text-gray-600">
                            {feature.description}
                          </p>
                        </CardFooter>
                      )}
                    </Card>
                  </div>
                </div>
              ))}
            </div>
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
                Doppelherz Health Metric.
              </p>
            </div>
            <Button
              onPress={handleStartNavigation} // Updated to onClick and new handler
              variant="bordered"
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
