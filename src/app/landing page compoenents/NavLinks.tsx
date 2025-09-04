"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NavLinks({ mobile = false, setIsMenuOpen }) {
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
      {links.map((link, index) =>
        mobile ? (
          <motion.div
            key={link.name}
            className="block py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-lg transition-colors"
            whileHover={{ x: 5 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href={link.href} className="w-full h-full z-200">
              {" "}
              {link.name}
            </Link>
          </motion.div>
        ) : (
          <motion.a
            key={index}
            href={link.href}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 cursor-pointer"
          >
            {link.name}
          </motion.a>
        )
      )}
    </div>
  );
}
