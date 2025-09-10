"use client";
import Logo from "@/componenets/Logo";
import { BsGoogle } from "react-icons/bs";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const route = useRouter();
  const { register, error } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleRegister = async () => {
    setMessage("");
    await register(formData.name, formData.email, formData.password);
    if (error) {
      setMessage(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const passwordRequirements = [
    {
      id: 1,
      text: "At least 8 characters",
      met: formData.password.length >= 8,
    },
    {
      id: 2,
      text: "One uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    { id: 3, text: "One number", met: /[0-9]/.test(formData.password) },
    {
      id: 4,
      text: "One special character",
      met: /[!@#$%^&*]/.test(formData.password),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f161e] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 md:p-12 w-full max-w-xl"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-400">Join thousands of productive teams</p>
        </div>

        {/* Google Sign Up */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-gray-900 rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-semibold mb-6 transition-all duration-200 hover:bg-gray-100"
        >
          <BsGoogle className="text-xl" />
          <span>Sign up with Google</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>
        {message && <p>{message}</p>}

        {/* Registration Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-4 h-4 border-2 border-gray-500 rounded-sm"></div>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Create a password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                ) : (
                  <FaEye className="text-gray-500 hover:text-gray-400" />
                )}
              </button>
            </div>

            {/* Password requirements */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req) => (
                  <div key={req.id} className="flex items-center">
                    <FaLock
                      className={`text-xs mr-2 ${
                        req.met ? "text-green-500" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        req.met ? "text-green-400" : "text-gray-500"
                      }`}
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-4 h-4 border-2 border-gray-500 rounded-sm"></div>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-500 hover:text-gray-400" />
                ) : (
                  <FaEye className="text-gray-500 hover:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Terms agreement */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Register button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!formData.agreeToTerms}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 px-4 font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              handleRegister();
            }}
          >
            Create Account
          </motion.button>
        </div>

        {/* Login link */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Summer Planner. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
