import React from "react";
import { Button } from "../../../shared";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SurveyCompletionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const SurveyCompletionPopup: React.FC<SurveyCompletionPopupProps> = ({
  isOpen,
  onClose,
  title = "Khảo sát hoàn thành!",
  message = "Cảm ơn bạn đã dành thời gian tham gia. Kết quả của bạn đã được ghi nhận.",
  buttonText = "Tuyệt vời!",
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-sm w-full text-center relative animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Đóng popup"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Party Popper Icon */}
        <div className="text-6xl mb-4">🎉</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Action Button */}
        <Button
          onPress={onClose}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SurveyCompletionPopup;
