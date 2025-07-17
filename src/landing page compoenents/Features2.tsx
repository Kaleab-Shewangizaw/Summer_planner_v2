"use client";
import Button from "@/componenets/Button";
import { motion } from "framer-motion";

export default function Features2() {
  return (
    <div className="lg:w-[75%] md:w-[90%] mx-auto mt-10 flex sm:flex-col md:flex-row gap-5  justify-between flex-wrap">
      <div className=" md:w-2/5 sm:w-full flex flex-col items-start justify-start ">
        {/* left */}
        <h1 className="text-5xl p-0 ">
          <em>Increase</em> your Performance with{"  "}
          <motion.span
            className="font-bold text-2xl h-15 w-15 rounded-md bg-red-500 rotate-z-15 p-2 pb-0 inline-flex items-end justify-center cursor-pointer"
            animate={{ rotateZ: 15 }}
            whileHover={{ rotateZ: -15 }}
          >
            SP
          </motion.span>
        </h1>
        <p className="font-bold text-lg text-gray-500 my-5">
          Join 100+ Companies with 2k+ users and boost your performance
        </p>
        <div className="pr-3 py-1">
          <Button text="Contact us" fill={true} bold="" size="xl" />
        </div>
      </div>
      <motion.div
        className="border w-60 h-60 rounded-full flex flex-col items-center justify-center gap-5 "
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
      >
        {/* middle */}
        <span className="text-xl text-gray-400">Minimize</span>
        <span className="text-5xl font-bold ">87%</span>
        <span className="text-xl text-gray-400">of meeting</span>
      </motion.div>
      <div className="border border-gray-500 w-60 h-60 rounded-full flex flex-col items-center justify-center gap-5 ">
        {/* right */}

        <span className="text-5xl font-bold">95%</span>
        <span className="text-xl text-gray-400">Task completed</span>
      </div>
    </div>
  );
}
