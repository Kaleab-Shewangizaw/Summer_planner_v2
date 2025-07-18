import Logo from "@/componenets/Logo";
import { BiEnvelope, BiPhone } from "react-icons/bi";

export default function Footer() {
  return (
    <div className="bg-[#0200007a] absolute  w-full left-0 py-5 pb-10">
      <div className="lg:w-[75%] md:w-[90%] mx-auto p-0  mb-10 flex justify-between  relative">
        <div className="w-1/3 ">
          <Logo />
          <p className="font-semibold text-gray-400">
            Summer Planner is your all-in-one solution for organizing tasks
          </p>
        </div>
        <div className="w-1/3  px-20">
          <h1 className="font-semibold mb-2">Contact us</h1>
          <p className="flex items-center gap-2 cursor-pointer mb-1 ">
            <BiPhone /> +251988680987
          </p>
          <p className="flex items-center gap-2 cursor-pointer mb-1 ">
            <BiEnvelope /> kaleab.stk@gmail.com
          </p>
        </div>
        <div className="flex gap-5 w-1/3  justify-between">
          <div>
            <h1 className="font-semibold mb-2">Company</h1>
            <p className="text-gray-300 cursor-pointer mb-1">Home</p>
            <p className="text-gray-300 cursor-pointer mb-1">About us</p>
            <p className="text-gray-300 cursor-pointer mb-1">Services</p>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Support</h1>
            <p className="text-gray-300 cursor-pointer mb-1">Help center</p>
            <p className="text-gray-300 cursor-pointer mb-1">FAQ</p>
          </div>
          <div>
            <h1 className="font-semibold mb-2">Legal</h1>
            <p className="text-gray-300 cursor-pointer mb-1">Privcy policy</p>
            <p className="text-gray-300 cursor-pointer mb-1">Terms of use</p>
          </div>
        </div>
      </div>
      <hr className="text-gray-400" />
      <p className="px-10 pt-5 text-gray-400">
        &copy; summer planner. All rights reserved. 2025.
      </p>
    </div>
  );
}
