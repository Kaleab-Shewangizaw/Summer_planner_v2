import { BiBell, BiSearch, BiUser } from "react-icons/bi";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <div className="w-full  py-1 relative flex items-center justify-between px-5 bg-blue-600/10 mb-1">
      {/* <div className=" w-0  rounded-full shadow-[0px_0px_300px_100px_#1447e6] absolute bottom-30  right-70 z-[-100] "></div> */}
      <div className=" scale-90">
        <Logo />
      </div>
      <div className="w-2/7 rounded-xl bg-black/40 h-9 pr-5 flex items-center">
        <input
          type="text"
          className="flex-1 focus:outline-none p-2 h-full placeholder:text-gray-500 text-sm"
          placeholder="Search"
        />
        <BiSearch className="text-2xl text-gray-400 cursor-pointer hover:text-gray-200 transition-all duration-100" />
      </div>
      <div className="flex gap-3 items-center text-gray-400 ">
        <button className="p-2 rounded-full bg-black/60 cursor-pointer relative hover:text-gray-200 transition-all duration-100">
          <div className="absolute bg-red-500 w-2 h-2 rounded-full right-2"></div>
          <BiBell className=" text-xl" />
        </button>
        <div className="h-8 border w-0"></div>
        <button className="p-2 rounded-full bg-black/60 cursor-pointer hover:text-gray-200 transition-all duration-100">
          <BiUser className=" text-xl" />
        </button>
      </div>
    </div>
  );
}
