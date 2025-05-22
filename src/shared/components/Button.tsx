import React from "react";
import {
  Button as HeroButton,
  type ButtonProps as HeroButtonProps,
} from "@heroui/react"; // Import HeroUI Button and its props

// Define custom props
type CustomColorStyle = "default" | "primary" | "secondary" | "light";
type ButtonVariant = "solid" | "bordered" | "light";

// Function to map variant to colorStyle
function mapVariantToColorStyle(variant: ButtonVariant): CustomColorStyle {
  switch (variant) {
    case "solid":
      return "primary";
    case "bordered":
      return "secondary";
    case "light":
      return "light";
    default:
      return "default";
  }
}

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  colorStyle?: CustomColorStyle;
  variant?: ButtonVariant; // Add variant prop for compatibility with existing code
  href?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  className = "",
  colorStyle = "default",
  variant, // Add variant prop
  ...props
}: CustomButtonProps & Omit<HeroButtonProps, "colorStyle" | "variant">) => {
  // Map variant prop to colorStyle if specified
  const effectiveColorStyle = variant
    ? mapVariantToColorStyle(variant)
    : colorStyle;
  // Combined style classes from both the custom styles and the global styles

  // Base styles from index.css, now applied to the component
  const baseStyleClasses =
    "font-medium font-inherit transition-colors duration-250 cursor-pointer";
  // Border styles incorporating the global button styles
  const borderClasses =
    "rounded-lg border border-solid border-transparent hover:border-[#646cff]";
  // Focus styles from the global CSS
  // const focusClasses =
  //   "focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-50";
  // Custom background and text colors based on colorStyle
  let colorClasses = "";
  // Use effectiveColorStyle instead of colorStyle to respect the variant prop
  switch (effectiveColorStyle) {
    case "primary":
      colorClasses =
        "bg-purple-800/80 text-white hover:bg-purple-800/90 hover:text-white";
      break;
    case "secondary":
      colorClasses =
        "bg-white text-purple-800 border-purple-800 hover:bg-purple-50";
      break;
    case "light":
      colorClasses =
        "bg-transparent text-neutral-600 border-transparent hover:bg-gray-100 hover:text-black";
      break;
    case "default":
    default:
      // Using rgba(92, 36, 130, 0.85) as the default color
      colorClasses =
        "bg-[rgba(92,36,130,0.85)] text-white hover:bg-[rgba(92,36,130,0.95)] hover:text-white";
      break;
  }

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
    ${colorClasses}
    ${borderRadiusClasses}
    ${responsiveClasses}
    ${touchTargetClasses}
    ${className || ""}
  `
    .trim()
    .replace(/\\s+/g, " "); // Pass the props directly

  return (
    <HeroButton className={combinedClasses} {...props}>
      {children}
    </HeroButton>
  );
};

export default Button;
