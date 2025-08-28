import Logo from "@/componenets/Logo";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { BsLightning } from "react-icons/bs";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="text-gray-400 mt-4 mb-6 max-w-xs">
              Summer Planner is your all-in-one solution for organizing tasks
              and boosting team productivity with intuitive tools.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact us
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+251988680987"
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <BiPhone className="w-4 h-4 mr-3" />
                +251 988 680 987
              </a>
              <a
                href="mailto:kaleab.stk@gmail.com"
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <BiEnvelope className="w-4 h-4 mr-3" />
                kaleab.stk@gmail.com
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                About us
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Careers
              </a>
            </div>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Help center
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Documentation
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Community
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Summer Planner. All rights reserved.
            </p>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Made with love */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm flex items-center justify-center">
              Made with <BsLightning className="text-yellow-500 mx-1" /> by
              Summer Planner Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
