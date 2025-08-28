"use client";
import { motion } from "framer-motion";
import { FaComments, FaTasks, FaRocket, FaLightbulb } from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaComments className="text-2xl" />,
      title: "Improved Communication",
      description:
        "Team members can share tasks, updates, and files within the app, keeping everyone on the same page.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaTasks className="text-2xl" />,
      title: "Reduced Workload",
      description:
        "Breaking down large projects into smaller, manageable tasks feels less daunting and promotes steady progress.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Boost Productivity",
      description:
        "Streamline workflows and eliminate distractions with our focused task management system.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Smart Prioritization",
      description:
        "Our AI-powered system helps you focus on what truly matters at the right time.",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-[#0f161e] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
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
            Boost your team&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              productivity
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Effortlessly organize your tasks with intuitive prioritization
            tools, ensuring you focus on what truly matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} mr-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-300 ml-16">{feature.description}</p>

              {/* Feature visualization placeholder */}
              <div
                className={`mt-6 h-32 rounded-lg bg-gradient-to-r ${feature.color} opacity-20`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
