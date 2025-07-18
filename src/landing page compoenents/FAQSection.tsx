"use client";

import Button from "@/componenets/Button";
import { motion } from "framer-motion";
import Accordion from "./Accordion";

export default function FaqSection() {
  return (
    <div className="lg:w-[75%] md:w-[90%] mx-auto p-0  mb-0  relative">
      <p className="font-bold text-lg text-gray-500 my-5">FAQ</p>
      <div className="flex mb-40">
        <div className="w-1/2 flex flex-col items-start ">
          {/* left */}
          <h1 className="text-5xl">Get your questions answered.</h1>
          <p className="font-bold text-lg text-gray-500 my-5">
            Our comperhensiv FAQ section provides clear and concise answers to
            every thing you might want to know.
          </p>
          <div className="py-1">
            <Button
              text="See all questions"
              fill={true}
              bold="bold"
              size="md"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5 items-center">
          {/* right */}
          <Accordion
            title="some thing goes here"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi vero ut, fugit cumque nulla minima soluta cupiditate deserunt, corrupti ratione nisi. Neque ab deleniti, voluptatum earum quasi sequi atque, vero expedita accusantium nesciunt veniam blanditiis repudiandae eaque placeat asperiores molestias facere pariatur iure? Maiores, itaque porro soluta vitae excepturi corrupti."
          />

          <Accordion
            title="some thing goes here"
            content="amet consectetur adipisicing elit. Eligendi vero ut, fugit cumque nulla minima soluta cupiditate deserunt, corrupti ratione nisi. Neque ab deleniti, voluptatum earum quasi sequi atque, vero expedita accusantium nesciunt veniam blanditiis repudiandae eaque placeat asperiores molestias facere pariatur iure? Maiores, itaque"
          />
          <Accordion
            title="some thing goes here"
            content="and the content is this one"
          />
          <Accordion
            title="some thing goes here"
            content="and the content is this one"
          />
        </div>
      </div>
      <div className="border rounded-md mb-20 border-[#1e3556bf] p-7 px-4 mt-4 flex items-center gap-5 bg-[#1b115ba1]">
        <div className="w-2/3">
          <h1 className="font-bold text-2xl">
            Unloack the power of productivity and team work
          </h1>
          <p className="font-bold text-lg text-gray-400 my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            sequi fuga nam quos expedita voluptatum omnis id doloremque
            molestiae ratione!
          </p>
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <motion.button
            className="text-xl font-bold border p-2 rounded-md cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          >
            Book a demo
          </motion.button>
        </div>
      </div>
      <div className=" w-0  rounded-full shadow-[0px_0px_200px_80px_#1447e6] absolute top-130 left-20 z-[-1]"></div>
      <div className=" w-0  rounded-full shadow-[0px_0px_200px_80px_#1447e6] absolute top-130 left-320 z-[-1]"></div>
    </div>
  );
}
