import { Link, useNavigate, useMatchRoute } from "@tanstack/react-router";
import React, { useCallback, useState } from "react";
import Button from "./Button";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "./ResizableNavbar";
import { authService } from "../services/authService";

const ResizableResponsiveNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const matchLogin = useMatchRoute()({ to: "/login" });
  const matchSurvey = useMatchRoute()({ to: "/survey" });
  const matchSurveyAnalysis = useMatchRoute()({
    to: "/survey/analysis/$score",
  });

  // Function to handle scrolling to features section
  const scrollToFeatures = useCallback(async () => {
    // First navigate to home page if not already there
    if (window.location.pathname !== "/") {
      await navigate({ to: "/" });
    }

    // Wait a bit for the page to load if we navigated
    setTimeout(
      () => {
        // Check if we're on desktop or tablet/mobile
        const isDesktop = window.innerWidth >= 1024;

        // Find the appropriate features section by ID
        const featuresSection = document.getElementById(
          isDesktop ? "features" : "features-tablet"
        );

        if (featuresSection) {
          featuresSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          // Fallback to finding by text content
          const featuresByText = Array.from(
            document.querySelectorAll("h2")
          ).find((el) => el.textContent?.includes("Tính năng chính"));

          if (featuresByText) {
            featuresByText.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      },
      window.location.pathname !== "/" ? 300 : 0
    );
  }, [navigate]);
  const menuItemsRaw = [
    { name: "Trang chủ", link: "/" },
    { name: "Tính năng", link: "#features", onClick: scrollToFeatures },
    { name: "Bài kiểm tra", link: "/survey" },
    {
      name: "Về chúng tôi",
      link: "https://doppelherz.vn/thuong-hieu-doppelherz/",
      external: true,
    },
  ];
  const menuItems =
    matchLogin || matchSurvey || matchSurveyAnalysis
      ? menuItemsRaw.filter(
          (item) =>
            item.name !== "Bài kiểm tra" &&
            (matchLogin || item.name !== "Tính năng")
        )
      : menuItemsRaw;

  const handleNavigateToLogin = () => {
    if (authService.isAuthenticated()) {
      navigate({ to: "/survey" });
    } else {
      navigate({ to: "/login" });
    }
  };

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo /> <NavItems items={menuItems} />
        {!(matchLogin || matchSurvey || matchSurveyAnalysis) && (
          <Button onPress={handleNavigateToLogin} variant="bordered">
            Bắt đầu ngay
          </Button>
        )}
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen}>
          {menuItems.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                onClick={(e) => {
                  // If the item has its own onClick handler, use it
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                  setIsOpen(false);
                }}
              >
                {item.name}
              </Link>
            )
          )}
          {!(matchLogin || matchSurvey || matchSurveyAnalysis) && (
            <Button onPress={handleNavigateToLogin} className="w-full mt-2">
              Bắt đầu ngay
            </Button>
          )}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default ResizableResponsiveNavBar;
