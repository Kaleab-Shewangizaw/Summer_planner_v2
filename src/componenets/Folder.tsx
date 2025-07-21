"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiFolder } from "react-icons/bi";
import { BsHash } from "react-icons/bs";
import { CgMoreVertical } from "react-icons/cg";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { PiX } from "react-icons/pi";

export default function Folder({
  name,
  id,
  projects,
}: {
  name: string;
  id: string;
  projects:
    | []
    | {
        name: string;
        id: string;
      }[];
}) {
  const [show, setShow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const realPath = usePathname()?.split("/");
  const path =
    realPath[1] === "tasks" ? realPath[2]?.split("%20")?.join(" ") : "";

  return (
    <div className={`text-gray-400 bg-blue-900/20 relative `}>
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
      <div
        className="flex w-full justify-between   cursor-pointer   py-3 px-2 hover:bg-blue-800/20"
        onDoubleClick={() => {
          alert("Hello motherfucker");
        }}
      >
        <div
          className=" p-1 cursor-pinter font-extralight cursor-pointer text-gray-300"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        <div className="text-2xl px-2 text-gray-400">
          <BiFolder />
        </div>
        <Link
          href={`/tasks/${name}`}
          className="flex-1"
          onClick={() => {
            setShow(!show);
          }}
        >
          <h1 className={`${path === name && "text-white font-bold"}`}>
            {name}{" "}
            {!show && (
              <div className="text-gray-400 text-xs px-2 py-1">
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </div>
            )}
          </h1>
        </Link>
        <div
          onClick={() => {
            setShowOptions(!showOptions);
          }}
          className="cursor-pointer"
        >
          {showOptions ? <PiX /> : <CgMoreVertical className="" />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {show && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className="overflow-hidden text-md capitalize bg-gray-900 py-2 border-r border-l border-gray-700 relative"
          >
            <div className=" flex justify-between px-2">
              <div className="text-gray-400 text-xs px-2 py-1">
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </div>
            </div>
            {projects.map((project, i) => {
              return (
                <h1
                  key={i}
                  className="hover:bg-gray-800 py-2 px-2 pl-9 transition-all duration-200 flex items-center rounded-sm min-w-fit cursor-pointer"
                >
                  <BsHash /> {project.name}
                </h1>
              );
            })}
            {projects.length === 0 && (
              <h1 className="text-gray-700 text-sm px-2 py-1">
                No projects in this folder
              </h1>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
