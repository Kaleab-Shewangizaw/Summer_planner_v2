"use client";
import React, { useState } from "react";

import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import {
  IoChatbox,
  IoChatboxOutline,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";

import {
  MdCalendarMonth,
  MdDashboard,
  MdHelp,
  MdHelpOutline,
  MdOutlineCalendarMonth,
  MdOutlineDashboard,
} from "react-icons/md";
import { PiNewspaper, PiNewspaperFill } from "react-icons/pi";
import { RiTaskFill, RiTaskLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = [
  {
    name: "feed",
    icon1: PiNewspaper,
    icon2: PiNewspaperFill,
  },
  {
    name: "dashboard",
    icon1: MdOutlineDashboard,
    icon2: MdDashboard,
  },
  {
    name: "tasks",
    icon1: RiTaskLine,
    icon2: RiTaskFill,
  },
  {
    name: "chat",
    icon1: IoChatboxOutline,
    icon2: IoChatbox,
  },
  {
    name: "teams",
    icon1: BsPeople,
    icon2: BsPeopleFill,
  },
  {
    name: "calendar",
    icon1: MdOutlineCalendarMonth,
    icon2: MdCalendarMonth,
  },
];
const icons2 = [
  {
    name: "settings",
    icon1: IoSettingsOutline,
    icon2: IoSettings,
  },
  {
    name: "help",
    icon1: MdHelpOutline,
    icon2: MdHelp,
  },
];

export default function Sidebar() {
  const location: string = usePathname().split("/")[1];
  const [show, setShow] = useState(true);

  return (
    <div className=" bg-blue-900/10 h-full mr-1 rounded-sm w-fit px-3 relative font-bold">
      <div className="mt-40">
        {icons.map((icon, i) => {
          const isHere = location === icon.name;
          const Icon = isHere ? icon.icon2 : icon.icon1;
          return (
            <Link key={i} href={`/${icon.name}`}>
              <div
                className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-150  ${
                  isHere ? "text-blue-500" : "text-gray-300 hover:text-blue-200"
                }`}
              >
                <Icon className="text-2xl" />
                <AnimatePresence initial={false}>
                  {show && (
                    <motion.h1
                      key="content"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeIn" }}
                      className="overflow-hidden text-md capitalize"
                    >
                      {icon.name}
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border mt-30"></div>
      <div>
        {icons2.map((icon, i) => {
          const isHere = location === icon.name;
          const Icon = isHere ? icon.icon2 : icon.icon1;
          return (
            <Link key={i} href={icon.name}>
              <div
                className={`flex items-center gap-2 mt-5 cursor-pointer transition-all duration-150  ${
                  isHere ? "text-blue-500" : "text-gray-300 hover:text-blue-300"
                }`}
              >
                <Icon className="text-2xl" />
                <AnimatePresence initial={false}>
                  {show && (
                    <motion.h1
                      key="content"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeIn" }}
                      className="overflow-hidden text-md capitalize"
                    >
                      {icon.name}
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className="rounded-full p-1 cursor-pinter bg-black/30 absolute right-2  top-2 cursor-pointer text-gray-300"
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? <FaAngleLeft /> : <FaAngleRight />}
      </div>
    </div>
  );
}
