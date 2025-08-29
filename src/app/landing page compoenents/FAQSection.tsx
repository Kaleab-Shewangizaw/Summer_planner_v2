"use client";

import Button from "@/app/componenets/Button";
import { motion } from "framer-motion";
import Accordion from "./Accordion";

export default function FaqSection() {
  const faqs = [
    {
      title: "How does the free trial work?",
      content:
        "Our 14-day free trial gives you full access to all features. No credit card required. You can upgrade to a paid plan at any time during or after the trial.",
    },
    {
      title: "Can I change plans anytime?",
      content:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any differences in billing.",
    },
    {
      title: "Is my data secure?",
      content:
        "Absolutely. We use industry-standard encryption and security practices to protect your data. We're compliant with GDPR and other privacy regulations.",
    },
    {
      title: "How many team members can I invite?",
      content:
        "The Basic plan includes 1 user, Pro includes up to 5 users, and Enterprise offers unlimited users. Team discounts are available for larger organizations.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#0f161e] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Get your questions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                answered
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Our comprehensive FAQ section provides clear and concise answers
              to everything you might want to know about our platform.
            </p>
            <Button
              text="See all questions"
              fill={true}
              bold="bold"
              size="md"
            />
          </motion.div>

          {/* Right content - FAQ Accordions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  title={faq.title}
                  content={faq.content}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-gray-700 rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8"
        >
          <div className="lg:w-2/3">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Unlock the power of productivity and teamwork
            </h3>
            <p className="text-lg text-gray-300">
              Join thousands of teams that use our platform to streamline their
              workflow and boost collaboration.
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 w-full lg:w-auto"
            >
              Book a demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
