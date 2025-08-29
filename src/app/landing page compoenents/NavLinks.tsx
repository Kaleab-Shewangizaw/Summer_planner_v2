"use client";
import { motion } from "framer-motion";

export default function NavLinks({ mobile = false }) {
  const links = [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  const container = mobile ? "flex flex-col space-y-4" : "flex space-x-8";

  return (
    <div className={container}>
      {links.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 cursor-pointer"
        >
          {link.name}
        </motion.a>
      ))}
    </div>
  );
}
