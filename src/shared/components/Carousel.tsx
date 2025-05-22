import React, { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { cn } from "../utils"; // Assuming you have a cn utility

interface CarouselProps {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  initialIndex?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  dotClassName?: string;
  activeDotClassName?: string;
  onSlideChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  className,
  itemClassName,
  initialIndex = 0,
  loop = true,
  autoplay = false,
  autoplayInterval = 3000,
  showDots = true,
  dotClassName = "w-2 h-2 rounded-full bg-gray-300 cursor-pointer",
  activeDotClassName = "bg-[#6942af]",
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalItems = items.length;

  const handleSetCurrentIndex = useCallback(
    (newIndex: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      if (onSlideChange) {
        onSlideChange(newIndex);
      }
      // Simulate transition time
      setTimeout(() => setIsTransitioning(false), 500); // Adjust timing based on actual CSS transition
    },
    [isTransitioning, onSlideChange]
  );

  const goToNext = useCallback(() => {
    if (!loop && currentIndex === totalItems - 1) return;
    const newIndex = loop
      ? (currentIndex + 1) % totalItems
      : Math.min(currentIndex + 1, totalItems - 1);
    handleSetCurrentIndex(newIndex);
  }, [currentIndex, totalItems, loop, handleSetCurrentIndex]);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  useEffect(() => {
    if (autoplay) {
      const intervalId = setInterval(() => {
        goToNext();
      }, autoplayInterval);
      return () => clearInterval(intervalId);
    }
  }, [autoplay, autoplayInterval, goToNext]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn("w-full flex-shrink-0", itemClassName)} // Ensure each item wrapper takes full width
          >
            {item}
          </div>
        ))}
      </div>

      {/* Optional: Add Next/Prev buttons if desired, similar to Aceternity UI */}
      {/* <button onClick={goToPrev} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white">Prev</button> */}
      {/* <button onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white">Next</button> */}

      {showDots && totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <div
              key={index}
              className={cn(
                dotClassName,
                currentIndex === index ? activeDotClassName : ""
              )}
              onClick={() => handleSetCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
