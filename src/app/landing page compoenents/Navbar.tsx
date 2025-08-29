"use client";
import Logo from "@/componenets/Logo";
import NavLinks from "./NavLinks";
import Button from "@/componenets/Button";
import { useState } from "react";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0f161e]/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <NavLinks />
        </div>

        <div className="hidden lg:block">
          <Button text={"Get Started"} fill={true} size="md" bold={""} />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-blue-400 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0f161e] border-t border-gray-800 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <NavLinks mobile={true} />
            <Button text={"Get Started"} fill={true} size="md" bold={""} />
          </div>
        </div>
      )}
    </nav>
  );
}
