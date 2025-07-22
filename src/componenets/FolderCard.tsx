"use client";

import Link from "next/link";
import { BiFolder } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { motion } from "framer-motion";
import { useState } from "react";

export default function FolderCard({ name }: { name: string }) {
  let na = "";
  if (name.length > 16) {
    for (let i = 0; i < 15; i++) {
      na += name[i];
    }
  } else {
    na = name;
  }
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 hidden group-hover:block z-100 p-2 rounded-full hover:bg-black/35 cursor-pointer ">
        <SlOptionsVertical
          className=" "
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        />
      </div>
      {showOptions && (
        <motion.div className="overflow-hidden border flex flex-wrap flex-col w-30 rounded-sm border-blue-400/20 bg-[#131e3c] z-100 absolute top-8 right-1">
          <button
            id="something"
            className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200"
          >
            + New project
          </button>

          <button className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200">
            Rename folder
          </button>
          <button className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200">
            Empty folder
          </button>

          <button className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200">
            Delete folder
          </button>
        </motion.div>
      )}
      <Link
        href={`tasks/${name}`}
        className="border border-blue-300/10 text-gray-400 group rounded-sm w-40 py-2 px-2 hover:text-gray-100 cursor-pointer flex flex-col items-center"
      >
        <BiFolder className="text-7xl" />
        <p className="text-md ">{na === name ? na : na + "..."}</p>
      </Link>
    </div>
  );
}
