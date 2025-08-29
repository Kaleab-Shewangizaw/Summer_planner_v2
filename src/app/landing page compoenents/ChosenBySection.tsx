"use client";
import {
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { motion } from "framer-motion";

export default function ChosenBySection() {
  const companies = [
    { icon: <FaGoogle />, name: "Google" },
    { icon: <FaLinkedin />, name: "LinkedIn" },
    { icon: <FaInstagram />, name: "Instagram" },
    { icon: <FaPinterestP />, name: "Pinterest" },
    { icon: <FaXTwitter />, name: "Twitter" },
  ];

  return (
    <section className="py-16 bg-[#0f161e]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-lg font-semibold text-gray-300 mb-3">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Chosen by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              innovative teams
            </span>{" "}
            at
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                color: "#60a5fa",
                transition: { duration: 0.2 },
              }}
              className="flex flex-col items-center group"
            >
              <div className="text-4xl md:text-5xl text-gray-400 group-hover:text-blue-400 transition-colors duration-300 mb-2">
                {company.icon}
              </div>
              <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300 mt-2">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 bg-gray-700 border-0" />
            <span className="absolute px-3 font-medium text-gray-500 bg-[#0f161e] -translate-x-1/2 left-1/2">
              And 100+ other companies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
