import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "../../../shared";
import { authService } from "../../../shared/services/authService";

interface AnalysisItem {
  scoreRange: string;
  minScore: number;
  maxScore: number;
  riskLevel: string;
  advice: string;
}

const analysisData: AnalysisItem[] = [
  {
    scoreRange: "85 - 100",
    minScore: 85,
    maxScore: 100,
    riskLevel: "Nội tiết tố ổn định",
    advice:
      "Nội tiết tố nữ trong cơ thể đang ở trạng thái ổn định. Bạn hãy duy trì lối sống lành mạnh: sinh hoạt nghỉ ngơi điều độ (ngủ 7-8 tiếng/ ngày), bổ sung dinh dưỡng cân bằng, tập luyện thể dục 3-5 lần/ tuần, khám sức khỏe định kỳ đều đặn.",
  },
  {
    scoreRange: "65 - 84",
    minScore: 65,
    maxScore: 84,
    riskLevel: "Nguy cơ thiếu hụt trung bình",
    advice:
      "Cơ thể đã có dấu hiệu thiếu hụt nội tiết nữ nhẹ. Bạn nên bổ sung các thực phẩm giàu isoflavone, các vitamin đặc biệt nhóm B,E và chăm sóc chất lượng giấc ngủ, cân bằng cuộc sống, giảm stress. Hạn chế các chất kích thích như café, rượu bia, thuốc lá.",
  },
  {
    scoreRange: "40 - 64",
    minScore: 40,
    maxScore: 64,
    riskLevel: "Nguy cơ thiếu hụt cao",
    advice:
      "Bắt đầu có các biểu hiện thiếu hụt nội tiết nữ rõ rệt. Nên bổ sung nội tiết nữ thực vật, canxi, collagen, các vitamin và khoáng chất. Thay đổi lối sống lành mạnh. Khám sức khỏe định kỳ và lắng nghe tư vấn từ bác sĩ, dược sĩ.",
  },
  {
    scoreRange: "Dưới 40",
    minScore: 0,
    maxScore: 39,
    riskLevel: "Nguy cơ thiếu hụt rất cao",
    advice:
      "Nội tiết nữ đã suy giảm nghiêm trọng. Cần lập kế hoạch chăm sóc chuyên sâu. Nếu đã mãn kinh hoặc cắt buồng trứng, hãy tham khảo bác sĩ nội tiết/sản phụ khoa để có giải pháp chăm sóc phù hợp nhất.",
  },
];

const getAnalysisByScore = (score: number): AnalysisItem | undefined => {
  return analysisData.find(
    (item) => score >= item.minScore && score <= item.maxScore
  );
};

const getBannerContentByScore = (score: number) => {
  if (score >= 85) {
    return {
      icon: <CheckCircleIcon />,
      message:
        "Xuất sắc! Nội tiết tố của bạn đang ổn định. Hãy tiếp tục duy trì lối sống lành mạnh!",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    };
  } else if (score >= 65) {
    return {
      icon: <ThumbsUpIcon />,
      message:
        "Tốt! Cơ thể có dấu hiệu thiếu hụt nhẹ. Hãy chú ý bổ sung dinh dưỡng và nghỉ ngơi.",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
    };
  } else if (score >= 40) {
    return {
      icon: <WarningIcon />,
      message:
        "Cần chú ý! Nguy cơ thiếu hụt cao. Hãy thay đổi lối sống và tham khảo ý kiến chuyên gia.",
      bgColor: "bg-orange-100",
      textColor: "text-orange-700",
    };
  } else {
    return {
      icon: <AlertIcon />,
      message:
        "Cần hành động ngay! Nguy cơ thiếu hụt rất cao. Hãy tham khảo bác sĩ chuyên khoa.",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
    };
  }
};

const getHealthSuggestionsByScore = (score: number) => {
  if (score >= 85) {
    return [
      {
        icon: <MoonIcon />,
        text: "Duy trì lối sống lành mạnh: sinh hoạt nghỉ ngơi điều độ (ngủ 7-8 tiếng/ ngày)",
        bgColor: "bg-yellow-200",
      },
      {
        icon: <HeartIcon />,
        text: "Bổ sung dinh dưỡng cân bằng, tập luyện thể dục 3-5 lần/ tuần, khám sức khỏe định kỳ đều đặn",
        bgColor: "bg-red-200",
      },
    ];
  } else if (score >= 65) {
    return [
      {
        icon: <span className="text-xl">🥗</span>,
        text: "Bổ sung các thực phẩm giàu isoflavone, các vitamin đặc biệt nhóm B,E",
        bgColor: "bg-green-200",
      },
      {
        icon: <MoonIcon />,
        text: "Chăm sóc chất lượng giấc ngủ, cân bằng cuộc sống, giảm stress",
        bgColor: "bg-yellow-200",
      },
      {
        icon: <span className="text-xl">🚫</span>,
        text: "Hạn chế các chất kích thích như café, rượu bia, thuốc lá",
        bgColor: "bg-red-200",
      },
    ];
  } else if (score >= 40) {
    return [
      {
        icon: <span className="text-xl">💊</span>,
        text: "Nên bổ sung nội tiết nữ thực vật, canxi, collagen, các vitamin và khoáng chất",
        bgColor: "bg-orange-200",
      },
      {
        icon: <span className="text-xl">🔄</span>,
        text: "Thay đổi lối sống lành mạnh",
        bgColor: "bg-blue-200",
      },
      {
        icon: <span className="text-xl">👨‍⚕️</span>,
        text: "Khám sức khỏe định kỳ và lắng nghe tư vấn từ bác sĩ, dược sĩ",
        bgColor: "bg-gray-200",
      },
    ];
  } else {
    return [
      {
        icon: <span className="text-xl">📋</span>,
        text: "Cần lập kế hoạch chăm sóc chuyên sâu",
        bgColor: "bg-gray-200",
      },
      {
        icon: <span className="text-xl">🏥</span>,
        text: "Nếu đã mãn kinh hoặc cắt buồng trứng, hãy tham khảo bác sĩ nội tiết/sản phụ khoa để có giải pháp chăm sóc phù hợp nhất",
        bgColor: "bg-gray-200",
      },
    ];
  }
};

// Placeholder icons (replace with actual SVGs or an icon library)
const FireIcon = () => <span className="text-xl">🔥</span>;
const ThumbsUpIcon = () => <span className="text-xl">👍</span>;
const MoonIcon = () => <span className="text-xl">🌙</span>;
const HeartIcon = () => <span className="text-xl">❤️</span>;
const CheckCircleIcon = () => <span className="text-xl">✅</span>;
const WarningIcon = () => <span className="text-xl">⚠️</span>;
const AlertIcon = () => <span className="text-xl">🚨</span>;

const SurveyAnalysisPage: React.FC = () => {
  const { score } = useParams({ from: "/survey/analysis/$score" });
  const navigate = useNavigate();
  const numericScore = score; // Already a number due to parseParams in router
  const [animatedScore, setAnimatedScore] = useState(0);

  const handleCompleteSurvey = () => {
    localStorage.setItem("isCompleteSurvey", "false");
    authService.handleLogout();
    navigate({ to: "/" });
  };

  // Animate score counting up
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          const increment = Math.ceil((numericScore - prev) / 10);
          if (prev + increment >= numericScore) {
            clearInterval(interval);
            return numericScore;
          }
          return prev + increment;
        });
      }, 50);
    }, 300);

    return () => clearTimeout(timer);
  }, [numericScore]);

  useEffect(() => {
    return () => {
      localStorage.setItem("isCompleteSurvey", "false");
      authService.removeAccessToken();
    };
  }, []);

  if (numericScore === undefined || isNaN(numericScore)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Lỗi: Điểm không hợp lệ
        </h1>
        <p className="text-gray-700 mb-6">
          Không thể hiển thị kết quả phân tích do điểm số không được cung cấp
          hoặc không hợp lệ.
        </p>
        <Button onPress={() => navigate({ to: "/" })} variant="solid">
          Về trang chủ
        </Button>
      </div>
    );
  }
  const analysis = getAnalysisByScore(numericScore);
  const bannerContent = getBannerContentByScore(numericScore);
  const healthSuggestions = getHealthSuggestionsByScore(numericScore);

  // Main page content starts here
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20 xl:px-64 lg:px-32 sm:px-16 px-0">
      {/* Header */}
      <header className="p-4 flex items-center sticky top-0 bg-gray-50 z-10 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-700 ml-4">
          Phân tích kết quả khảo sát
        </h1>
        {/* Optional: Fire icon on the right */}
        <div className="ml-auto p-2 text-orange-500">
          <FireIcon />
        </div>
      </header>

      <main className="p-4 sm:p-6 space-y-8">
        {" "}
        {/* Main Score Display */}
        <motion.section
          className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            {/* Outer glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${
                  numericScore >= 85
                    ? "#10b981"
                    : numericScore >= 65
                    ? "#f59e0b"
                    : numericScore >= 40
                    ? "#f97316"
                    : "#ef4444"
                }20, transparent)`,
                filter: "blur(20px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
              {/* Gradient definitions */}
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={
                      numericScore >= 85
                        ? "#10b981"
                        : numericScore >= 65
                        ? "#f59e0b"
                        : numericScore >= 40
                        ? "#f97316"
                        : "#ef4444"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      numericScore >= 85
                        ? "#059669"
                        : numericScore >= 65
                        ? "#d97706"
                        : numericScore >= 40
                        ? "#ea580c"
                        : "#dc2626"
                    }
                  />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="8"
              />

              {/* Animated progress arc */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                filter="url(#glow)"
                initial={{ strokeDasharray: `0 ${2 * Math.PI * 45}` }}
                animate={{
                  strokeDasharray: `${
                    (numericScore / 100) * 2 * Math.PI * 45
                  } ${2 * Math.PI * 45}`,
                }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Pulse effect at progress end */}
              <motion.circle
                cx="50"
                cy="5" // Top of circle (after rotation)
                r="3"
                fill={
                  numericScore >= 85
                    ? "#10b981"
                    : numericScore >= 65
                    ? "#f59e0b"
                    : numericScore >= 40
                    ? "#f97316"
                    : "#ef4444"
                }
                transform={`rotate(${(numericScore / 100) * 360 - 90} 50 50)`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.5,
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className={`text-4xl sm:text-5xl font-bold mt-1 ${
                  numericScore >= 85
                    ? "text-green-500"
                    : numericScore >= 65
                    ? "text-yellow-500"
                    : numericScore >= 40
                    ? "text-orange-500"
                    : "text-red-500"
                }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {animatedScore}
              </motion.span>
              <motion.div
                className="w-8 h-1 bg-gray-300 rounded-full mt-2"
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
            </div>
          </div>
        </motion.section>{" "}
        {/* Goal Banner - Dynamic based on score */}
        <motion.section
          className={`p-3 ${bannerContent.bgColor} ${bannerContent.textColor} rounded-lg flex items-center justify-center shadow`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            {bannerContent.icon}
          </motion.div>
          <p className="ml-2 text-sm font-medium">{bannerContent.message}</p>
        </motion.section>{" "}
        {/* Health Suggestions - Dynamic based on score */}
        <motion.section
          className="p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Lời khuyên từ chuyên gia chăm sóc sức khỏe
          </h2>
          <div className="space-y-4">
            {healthSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 2.3 + index * 0.2,
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <motion.div
                  className={`p-2 ${suggestion.bgColor} rounded-full`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {suggestion.icon}
                </motion.div>
                <div className="ml-3 flex-grow">
                  <p className="font-normal">{suggestion.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        {/* Error case for no analysis found (should be handled earlier, but as a fallback) */}
        {!analysis && (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-xl font-bold text-red-600 mb-2">
              Lỗi: Không tìm thấy phân tích
            </h1>
            <p className="text-gray-700">
              Không tìm thấy kết quả phân tích phù hợp với điểm số{" "}
              {numericScore}.
            </p>
          </div>
        )}
        <div className="mt-10 text-center">
          <Button
            onPress={handleCompleteSurvey}
            variant="solid"
            className="w-auto py-2.5"
          >
            Hoàn thành
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SurveyAnalysisPage;
