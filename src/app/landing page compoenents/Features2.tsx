"use client";
import Button from "@/app/componenets/Button";
import { motion } from "framer-motion";
import { FaChartLine, FaCheckCircle, FaClock, FaUsers } from "react-icons/fa";

export default function Features2() {
  const stats = [
    {
      value: "87%",
      label: "Meeting time reduced",
      description: "Streamlined communication cuts unnecessary meetings",
      icon: <FaClock className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "95%",
      label: "Tasks completed",
      description: "Higher completion rates with better task management",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "from-green-500 to-teal-500",
    },
    {
      value: "2K+",
      label: "Active users",
      description: "Join our growing community of productive teams",
      icon: <FaUsers className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "42%",
      label: "Productivity boost",
      description: "Average increase in team output",
      icon: <FaChartLine className="text-2xl" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-[#0f161e] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-2/5"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Increase
              </span>{" "}
              your Performance with{" "}
              <motion.span
                className="inline-flex bg-red-500 text-white font-bold text-2xl h-12 w-12 rounded-md p-2  items-end  ml-2"
                animate={{ rotateZ: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{
                  rotateZ: 15,
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                <p>SP</p>
              </motion.span>
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              Join 100+ companies and 2,000+ users who have transformed their
              workflow and boosted performance with our platform.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                text="Contact us"
                fill={true}
                bold="bold"
                size="lg"
                className="w-full lg:w-auto"
              />
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700 rounded-2xl p-6 text-center backdrop-blur-sm hover:border-gray-600 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}
                >
                  {stat.icon}
                </div>

                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                <p className="text-sm text-gray-400">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-full max-w-2xl mx-auto p-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl">
            <div className="text-left mr-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Ready to boost your team&apos;s performance?
              </h3>
              <p className="text-gray-400">Start your free trial today</p>
            </div>
            <Button text="Get Started" fill={true} bold="bold" size="md" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
