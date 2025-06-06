"use client";
import { cn } from "../utils/cn";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import LogoImages from "../../assets/images/logo.png"; // Adjust the path as necessary

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    onClick?: () => void; // Added onClick for individual items
    external?: boolean; // Add external flag for links that should open in new tab
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 w-full", className)}
      style={{ zIndex: 999999 }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-5 lg:h-[72px] lg:flex",
        visible && "bg-white/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden h-full flex-1 items-center justify-center lg:flex",
        className
      )}
    >
      <div className="flex items-center justify-center space-x-4">
        {items.map((item, idx) => (
          <div
            key={`nav-item-${idx}`}
            className="relative"
            onMouseEnter={() => setHovered(idx)}
          >
            {item.onClick ? (
              <div
                className={`relative px-4 py-3 cursor-pointer text-sm font-medium transition-colors duration-200 ${
                  hovered === idx ? "text-black" : "text-zinc-600"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick?.();
                  if (onItemClick) onItemClick();
                }}
              >
                <span className="relative z-10">{item.name}</span>
                {hovered === idx && (
                  <motion.div
                    layoutId="navbar-item-highlight"
                    className="absolute inset-0 rounded-full bg-gray-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            ) : item.external ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <div
                  className={`relative px-4 py-3 cursor-pointer text-sm font-medium transition-colors duration-200 ${
                    hovered === idx ? "text-black" : "text-zinc-600"
                  }`}
                  onClick={() => {
                    if (onItemClick) onItemClick();
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {hovered === idx && (
                    <motion.div
                      layoutId="navbar-item-highlight"
                      className="absolute inset-0 rounded-full bg-gray-100"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </div>
              </a>
            ) : (
              <Link to={item.link} className="no-underline">
                <div
                  className={`relative px-4 py-3 cursor-pointer text-sm font-medium transition-colors duration-200 ${
                    hovered === idx ? "text-black" : "text-zinc-600"
                  }`}
                  onClick={() => {
                    if (onItemClick) onItemClick();
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {hovered === idx && (
                    <motion.div
                      layoutId="navbar-item-highlight"
                      className="absolute inset-0 rounded-full bg-gray-100"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:h-[72px] lg:hidden",
        visible && "bg-white/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-[72px] z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black lg:h-[72px] lg:flex lg:items-center"
    >
      <img
        src={LogoImages} // Update this path to your logo
        alt="logo"
        width={42}
        height={42}
      />
    </Link>
  );
};
