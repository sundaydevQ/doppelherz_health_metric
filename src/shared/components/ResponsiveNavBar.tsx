import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "../../assets/images/logo.png";
import Button from "./Button";

const ResponsiveNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto sm:h-12"
                src={logo}
                alt="Doppelherz Logo"
              />
              <span className="ml-3 text-[#6942af] font-semibold text-lg hidden md:block">
                Doppelherz Health Metric
              </span>
            </Link>
          </div>
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[#6942af] font-medium hover:text-[#5a3894] transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              to="/"
              className="text-gray-600 font-medium hover:text-[#6942af] transition-colors"
            >
              Tính năng
            </Link>
            <Link
              to="/"
              className="text-gray-600 font-medium hover:text-[#6942af] transition-colors"
            >
              Về chúng tôi
            </Link>
            <Button href="/survey" className="px-4 py-2 rounded-lg font-medium">
              Bắt đầu ngay
            </Button>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#6942af] hover:bg-gray-100 bg-transparent"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link
            to="/"
            className="text-[#6942af] block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            to="/"
            className="text-gray-600 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-[#6942af]"
            onClick={() => setIsMenuOpen(false)}
          >
            Tính năng
          </Link>{" "}
          <Link
            to="/"
            className="text-gray-600 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-[#6942af]"
            onClick={() => setIsMenuOpen(false)}
          >
            Về chúng tôi
          </Link>
          <Button
            href="/survey"
            className="bg-[#6942af] text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#5a3894] mt-4 w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            Bắt đầu ngay
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavBar;
