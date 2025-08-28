"use client";
import { motion } from "framer-motion";

export default function PreviewSection() {
  return (
    <section className="py-20 bg-[#0f161e] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Experience the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Power
            </span>{" "}
            of
          </h2>

          <motion.div
            className="flex items-end justify-center mb-8"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="font-bold text-4xl md:text-6xl h-20 w-20 md:h-24 md:w-24 rounded-lg bg-red-500  p-3 inline-flex items-center justify-center text-white mr-3 shadow-lg"
              animate={{
                rotateZ: [0, 3, -3, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              SP
            </motion.span>
            <span className="text-4xl md:text-6xl font-bold text-white">
              Summer Planner
            </span>
          </motion.div>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See how our intuitive interface transforms your task management
            experience
          </p>
        </motion.div>

        {/* Laptop Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mx-auto max-w-4xl"
        >
          {/* Laptop Screen */}
          <div className="relative w-full max-w-4xl">
            <div className="border-4 border-gray-700  bg-gray-900 rounded-2xl  p-2  z-10 relative">
              {/* Screen bezel */}
              <div className="bg-black rounded-lg  overflow-hidden relative">
                {/* Camera notch */}

                {/* Screen content */}
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>

                  {/* App interface mockup */}
                  <div className="relative z-10 w-4/5 max-w-md">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <div className="flex-1 bg-gray-700/50 rounded h-2 ml-2"></div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-4 h-4 border border-green-500 rounded-sm mr-3"></div>
                          <div className="bg-gray-700/50 h-2 rounded w-1/2"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 border border-blue-500 rounded-sm mr-3"></div>
                          <div className="bg-gray-700/50 h-2 rounded w-2/3"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 border border-purple-500 rounded-sm mr-3"></div>
                          <div className="bg-gray-700/50 h-2 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop hinge */}
            <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-800 mx-auto">
              dhdh
            </div>
          </div>

          {/* Laptop base */}
          <div className="w-full max-w-4xl">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-b-2xl h-6 md:h-8 relative">
              {/* Trackpad */}
            </div>

            {/* Keyboard area */}
            <div className="w-full max-w-4xl mt-2">
              <div className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-lg h-4 md:h-6 flex justify-between items-center px-4">
                <div className="w-1/3 h-1 bg-gray-700 rounded"></div>
                <div className="w-8 h-2 bg-gray-700 rounded-full"></div>
                <div className="w-1/3 h-1 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">Ready to experience it yourself?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
              Start Free Trial
            </button>
            <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-blue-500 hover:text-blue-400 transition-all duration-200">
              Watch Demo Video
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
