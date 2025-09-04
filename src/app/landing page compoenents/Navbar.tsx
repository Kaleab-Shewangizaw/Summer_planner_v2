"use client";
import Logo from "@/componenets/Logo";
import NavLinks from "./NavLinks";
import Button from "@/componenets/Button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="w-full bg-[#0f161e]/90 backdrop-blur-md border-b border-gray-800 top-0 z-50  
    fixed     transition-all duration-300"
      >
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-800/50 overflow-hidden"
            >
              <div className="flex flex-col my-4 gap-4 items-center">
                <NavLinks mobile={true} />
                <Button text={"Get Started"} fill={true} size="md" bold={""} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
