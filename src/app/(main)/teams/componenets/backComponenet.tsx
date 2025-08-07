"use client";

import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

export default function BackButton() {
  const router = useRouter();

  return (
    <BsArrowLeft
      className="text-2xl cursor-pointer text-gray-500 hover:text-white"
      onClick={() => router.back()}
    />
  );
}
