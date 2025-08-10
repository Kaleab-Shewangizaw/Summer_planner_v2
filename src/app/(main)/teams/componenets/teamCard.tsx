"use client";

import { useEffect, useRef, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { motion } from "framer-motion";

export default function TeamsCard() {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);
  return (
    <div className="flex flex-col items-center justify-center group   h-full text-sm border w-90 border-gray-600 cursor-pointer  px-2 py-1 rounded-md relative">
      <div
        className="absolute top-2 right-2 hidden group-hover:block z-100 p-2 rounded-full hover:bg-black/35 cursor-pointer "
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        {!showOptions && <SlOptionsVertical className="" />}
      </div>
      {showOptions && (
        <motion.div
          className="overflow-hidden border flex flex-wrap flex-col w-30 rounded-sm border-blue-400/20 bg-[#131e3c] z-100 absolute top-1 right-1"
          ref={optionsRef}
        >
          <button
            className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200"
            onClick={() => {
              setShowOptions(false);
            }}
          >
            Rename team
          </button>
          <button
            className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to delete all projects inside this folder?"
                )
              ) {
              }
              setShowOptions(false);
            }}
          >
            Leave team
          </button>

          <button
            className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200"
            onClick={() => {}}
          ></button>
        </motion.div>
      )}
      <h1 className="text-lg font-bold my-3">Team Name</h1>
      <div className="flex ">
        <div className="w-10 h-10 rounded-full bg-yellow-500"></div>
        <div className="w-10 h-10 rounded-full -ml-3 bg-blue-500"></div>
        <div className="w-10 h-10 rounded-full -ml-3 bg-purple-500"></div>
        <div className="w-10 h-10 -ml-3 rounded-full bg-green-500"></div>
        <div className="w-10 h-10 -ml-3 rounded-full bg-amber-500"></div>
      </div>
      <p className="my-3 text-gray-500">+3 members</p>
      <div className="flex  w-full px-3 justify-between mb-3">
        <p className="flex items-center gap-2">
          <BsClock className="text-md text-amber-600" /> 2 Active projects
        </p>
        <p className="flex items-center gap-2">
          <BiCheckCircle className="text-lg text-green-600" /> 3 Completed
          projects
        </p>
      </div>
    </div>
  );
}
