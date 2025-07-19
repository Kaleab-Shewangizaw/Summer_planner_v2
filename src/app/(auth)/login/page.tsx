import Logo from "@/componenets/Logo";
import { BsGoogle } from "react-icons/bs";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center relative">
      <div className=" w-0  rounded-full shadow-[0px_0px_300px_100px_#1447e6] absolute top-70 right-50 "></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_300px_100px_#1447e6] absolute bottom-70 left-50 "></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_300px_100px_#1447e6] absolute bottom-100 left-220 "></div>
      <div className=" rounded-xl bg-blue-600/20  mx-auto flex flex-col items-center justify-center p-20">
        <Logo />
        <button className="mt-20 border border-gray-500/60 text-gray-200 w-80 h-10 rounded-xl flex items-center justify-center cursor-pointer  transition-all duration-100 gap-5 font-bold">
          <BsGoogle className="text-2xl" />
          <p> Login with google</p>
        </button>
        <p className="w-full font-semibold text-gray-400 mt-10 ">Email</p>
        <div className="mt-2 border border-black/10 bg-black/50 text-gray-200 w-80 h-10 rounded-xl flex items-center">
          <input
            type="email"
            className="focus:outline-none p-2 h-full flex-1 placeholder:text-gray-600"
            placeholder="Email address"
          />
        </div>
        <button className="mt-5 border border-gray-500/60 text-gray-200 w-80 h-10 rounded-xl flex items-center justify-center cursor-pointer  transition-all duration-100 gap-5 font-bold">
          <p> Login with email</p>
        </button>
        <div className="mt-10 flex items-center w-full gap-1 text-gray-500 font-bold">
          <div className="flex-1 border-t w-full"></div>
          <p>Summer Planner</p>
          <div className="flex-1 border-t w-full"></div>
        </div>
      </div>
    </div>
  );
}
