"use client";

import { useState } from "react";
import { easeIn, motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";

export default function Accordion({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div className="w-[80%] bg-[#181f2e] rounded-lg">
      <div
        className="flex cursor-pointer items-center font-bold w-full justify-between p-3 mb-0"
        onClick={() => {
          setExpand(!expand);
        }}
      >
        {title} {expand ? <BiMinus /> : <BiPlus />}
      </div>
      {expand && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          // TODO
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden px-3 mt-0 pb-3"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
}
