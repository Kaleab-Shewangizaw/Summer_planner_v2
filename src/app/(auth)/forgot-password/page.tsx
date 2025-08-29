"use client";
import Logo from "@/app/componenets/Logo";
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0f161e] flex items-center justify-center relative overflow-hidden p-4">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-20 right-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 md:p-12 w-full max-w-md text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-3xl text-green-500" />
            </div>
          </motion.div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-white mb-4">
            Check your email
          </h2>
          <p className="text-gray-400 mb-6">
            We&apos;ve sent a password reset link to{" "}
            <span className="text-blue-400">{email}</span>
          </p>
          <p className="text-gray-500 text-sm mb-8">
            If you don&apos;t see the email, check your spam folder or try
            resending.
          </p>

          {/* Actions */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gray-700 text-white rounded-xl py-3 px-4 font-semibold transition-all duration-200 hover:bg-gray-600"
            >
              Resend email
            </motion.button>

            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-gray-600 text-gray-300 rounded-xl py-3 px-4 font-semibold transition-all duration-200 hover:border-blue-500 hover:text-blue-400"
              >
                Back to login
              </motion.button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              Still having trouble?{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Contact support
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f161e] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 md:p-12 w-full max-w-md"
      >
        {/* Back button */}
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to login
          </motion.button>
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Reset your password
          </h1>
          <p className="text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
        </div>

        {/* Reset Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 px-4 font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </motion.button>
        </form>

        {/* Additional help */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Security note */}
        <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-400 text-sm text-center">
            <span className="font-semibold">Security note:</span> We&apos;ll
            never ask for your password outside of the login page.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
