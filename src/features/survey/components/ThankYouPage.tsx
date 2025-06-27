import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "../../../shared";
import { authService } from "../../../shared/services/authService";
import aktivMenoImage from "../../../assets/images/aktiv-meno.jpg";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    return () => {
      localStorage.setItem("isCompleteSurvey", "false");
      authService.removeAccessToken();
    };
  }, []);

  const handleReturnHome = () => {
    localStorage.setItem("isCompleteSurvey", "false");
    authService.handleLogout();
    navigate({ to: "/" });
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Main Thank You Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Success Icon */}
          <motion.div
            className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              type: "spring",
              stiffness: 200,
            }}
          >
            <motion.svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>

          {/* Thank You Message */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Cảm ơn khách hàng đã tham gia khảo sát!
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Chúng tôi rất trân trọng thời gian và thông tin quý báu mà bạn đã
            chia sẻ. Kết quả phân tích sẽ giúp bạn hiểu rõ hơn về tình trạng sức
            khỏe của mình.
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-3 h-3 bg-purple-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />{" "}
          </motion.div>

          {/* Product Showcase */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <motion.h3
                className="text-xl font-semibold text-gray-800 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                🌟 Sản phẩm được đề xuất cho bạn
              </motion.h3>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {" "}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={aktivMenoImage}
                    alt="Aktiv Meno - Sản phẩm hỗ trợ nội tiết tố nữ"
                    className="w-32 h-40 sm:w-40 sm:h-48 object-cover rounded-lg shadow-lg border-2 border-white cursor-pointer transition-transform hover:shadow-xl"
                    onClick={handleImageClick}
                  />
                </motion.div>
                <motion.div
                  className="flex-1 text-left"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <h4 className="text-lg font-bold text-purple-800 mb-2">
                    Doppelherz Aktiv Meno
                  </h4>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    Viên uống hỗ trợ cân bằng nội tiết tố nữ, giảm các triệu
                    chứng tiền mãn kinh và mãn kinh. Chứa chiết xuất từ thảo
                    dược tự nhiên, an toàn và hiệu quả.
                  </p>
                  {/* <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      ✓ Thành phần tự nhiên
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      ✓ Chất lượng Đức
                    </span>
                  </div> */}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Return Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button
              onPress={handleReturnHome}
              variant="solid"
              className="w-auto py-2.5"
            >
              Về trang chủ
            </Button>
          </motion.div>
        </motion.div>

        {/* Additional Message */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <p className="text-gray-700 text-sm">
            🌟 Hãy tiếp tục chăm sóc sức khỏe của bạn theo những lời khuyên đã
            được đưa ra.
          </p>
        </motion.div>
      </motion.div>

      {/* Background Animation */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Image Modal */}
      {showImageModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[999999999999] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
              aria-label="Close image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Full size image */}
            <img
              src={aktivMenoImage}
              alt="Aktiv Meno - Sản phẩm hỗ trợ nội tiết tố nữ"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ThankYouPage;
