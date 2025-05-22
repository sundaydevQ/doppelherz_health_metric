import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "../utils/cn";

interface NavbarMenuProps {
  items: {
    title: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
}

interface MenuItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

export const NavbarMenu = ({ items }: NavbarMenuProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative z-50">
      <nav className="flex items-center space-x-4 px-4">
        {items.map((item, index) => (
          <NavbarItem
            key={item.title}
            item={item}
            isActive={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          />
        ))}
      </nav>
    </div>
  );
};

const NavbarItem: React.FC<{
  item: MenuItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ item, isActive, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="relative group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to={item.href}
        className={cn(
          "relative flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md",
          isActive ? "text-purple-800" : "text-gray-600 hover:text-purple-700"
        )}
      >
        {item.title}
      </Link>
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-3 right-3 h-0.5 bg-purple-800"
          layoutId="navbar-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </div>
  );
};

export default NavbarMenu;
