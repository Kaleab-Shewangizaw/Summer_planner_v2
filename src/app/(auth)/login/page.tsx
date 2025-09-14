"use client";
import Logo from "@/componenets/Logo";
import { BsGoogle } from "react-icons/bs";
import { FaEnvelope, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginAction = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email(
        {
          email: email,
          password: password,
          callbackURL: "/tasks",
        },
        {
          onRequest: (ctx) => {
            console.log("Login request initiated", ctx);
          },
          onSuccess: (ctx) => {
            console.log("Login successful", ctx);
            setMessage("Login successful! Redirecting...");
            router.push("/tasks");
          },
          onError: (ctx) => {
            setMessage(
              ctx.error?.message ||
                "Login failed. Please check your credentials."
            );
          },
        }
      );
    } catch (error) {
      setMessage(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f161e] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
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
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">
            Sign in to your Summer Planner account
          </p>
        </div>

        {/* Google Login */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white text-gray-900 rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-semibold mb-6 transition-all duration-200 hover:bg-gray-100"
        >
          <BsGoogle className="text-xl" />
          <span>Continue with Google</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        {/* Message display */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              message.includes("successful")
                ? "bg-green-900/30 text-green-400"
                : "bg-red-900/30 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Email Login Form */}
        <form onSubmit={loginAction} className="space-y-4">
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
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
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
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl py-3 px-4 font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </motion.button>
        </form>

        {/* Sign up link */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Sign up
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
