"use client";
import Button from "@/componenets/Button";
import { motion } from "framer-motion";
import { FaCheck, FaCrown, FaStar, FaUsers, FaRocket } from "react-icons/fa";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic Plan",
      price: "$9",
      period: "month",
      description: "Perfect for individuals getting started",
      features: [
        "Access to core features",
        "Basic email support",
        "1 user account",
        "5GB storage",
        "Basic analytics",
      ],
      popular: false,
      icon: <FaStar className="text-yellow-400" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Pro Plan",
      price: "$19",
      period: "month",
      description: "Ideal for growing teams and professionals",
      features: [
        "All Basic Plan features",
        "Priority email & chat support",
        "Up to 5 user accounts",
        "50GB storage",
        "Advanced analytics",
        "Custom workflows",
        "Export capabilities",
      ],
      popular: true,
      icon: <FaRocket className="text-purple-400" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "month",
      description: "For organizations with advanced needs",
      features: [
        "All Pro Plan features",
        "24/7 dedicated support",
        "Unlimited user accounts",
        "500GB storage",
        "Advanced security",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
      ],
      popular: false,
      icon: <FaCrown className="text-amber-400" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 bg-[#0f161e] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
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
            Powerful features at an{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              affordable price
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include a 14-day
            free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-8 backdrop-blur-sm border transition-all duration-300 ${
                plan.popular
                  ? "border-transparent bg-gradient-to-br from-purple-900/30 to-pink-900/20 shadow-2xl shadow-purple-500/20 scale-105"
                  : "border-gray-700 bg-gray-900/30 hover:border-gray-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <Button
                  text="Start Free Trial"
                  fill={plan.popular}
                  bold="bold"
                  size="md"
                  className="w-full"
                />
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <FaCheck className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional pricing info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center bg-gray-800/30 border border-gray-700 rounded-2xl px-6 py-4">
            <FaUsers className="text-blue-400 mr-3" />
            <p className="text-gray-300">
              <span className="text-white font-semibold">Team discounts</span>{" "}
              available for 10+ users
            </p>
            <button className="ml-4 text-blue-400 hover:text-blue-300 text-sm font-semibold">
              Contact sales →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
