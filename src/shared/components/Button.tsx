import React from "react";
import {
  Button as HeroButton,
  type ButtonProps as HeroButtonProps,
} from "@heroui/react"; // Import HeroUI Button and its props

// Extend HeroButtonProps and allow for other HTML button attributes
interface CustomButtonProps
  extends HeroButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HeroButtonProps> {
  children: React.ReactNode;
  // href is already part of HeroButtonProps if it's linkable
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  className,
  ...props
}) => {
  // Combined style classes from both the custom styles and the global styles

  // Base styles from index.css, now applied to the component
  const baseStyleClasses =
    "font-medium font-inherit transition-colors duration-250 cursor-pointer";

  // Border styles incorporating the global button styles
  const borderClasses =
    "rounded-lg border border-solid border-transparent hover:border-[#646cff]";

  // Focus styles from the global CSS
  const focusClasses =
    "focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-50";

  // Custom background and text colors with dark/light mode support
  const colorClasses =
    "bg-[#1a1a1a] hover:bg-purple-800/90 text-white dark:bg-purple-800/80 dark:hover:bg-purple-800/90 light:bg-[#f9f9f9] light:text-black";
  // Border radius - consistent with both designs
  const borderRadiusClasses = "rounded";

  // Device-specific responsive styles following requirements:
  // Mobile:
  // - Height: 44px
  // - Padding: 12px horizontal, 10px vertical
  // - Text size: 16px

  // Tablet:
  // - Height: 44px
  // - Padding: 20px horizontal, 12px vertical
  // - Text size: 16px

  // Desktop:
  // - Height: 36px
  // - Padding: 20px horizontal, 10px vertical
  // - Text size: 14px
  const responsiveClasses =
    "h-[44px] px-3 py-2.5 text-base md:px-5 md:py-3 lg:h-9 lg:px-5 lg:py-2.5 lg:text-sm";

  // Ensure adequate touch target for accessibility
  const touchTargetClasses =
    "min-h-[44px] min-w-[44px] md:min-h-[48px] md:min-w-[48px]";
  // Combine all classes
  const combinedClasses = `
    ${baseStyleClasses}
    ${borderClasses}
    ${focusClasses}
    ${colorClasses}
    ${borderRadiusClasses}
    ${responsiveClasses}
    ${touchTargetClasses}
    ${className || ""}
  `
    .trim()
    .replace(/\\s+/g, " ");

  return (
    <HeroButton className={combinedClasses} {...props}>
      {children}
    </HeroButton>
  );
};

export default Button;
