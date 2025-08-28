"use client";
import Button from "@/componenets/Button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-[#0f161e]">
      {/* Background elements with subtle glow */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Organize
            </span>{" "}
            your work,
            <br />
            One{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              task
            </span>{" "}
            at a time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            TaskFlow goes beyond basic to-do lists, offering intuitive tools for
            prioritizing and managing tasks with ease. Streamline your workflow
            and boost productivity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              text="Get Started - It's Free"
              fill={true}
              bold="bold"
              size="lg"
              className="w-full sm:w-auto"
            />
            <Button
              text="See How It Works"
              fill={false}
              bold="bold"
              size="lg"
              className="w-full sm:w-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative rounded-xl shadow-2xl overflow-hidden border border-gray-800 mx-auto max-w-4xl"
          >
            <div className="aspect-video bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center text-white font-semibold">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative z-10 p-8 text-center">
                <div className="text-2xl mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  App Preview
                </div>
                <p className="text-sm text-gray-300">
                  Clean, intuitive task management interface
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-gray-400 text-sm"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Trusted by 10,000+ users
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              4.8/5 rating
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Free forever plan
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
