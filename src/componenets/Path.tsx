"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BsArrowLeft } from "react-icons/bs";

export default function Path() {
  const realPath = usePathname();
  const path = realPath.split("/");
  console.log(path);
  return (
    <div className=" w-full flex gap-10 text-md text-gray-500 py-2 border-b">
      <BsArrowLeft
        className="text-2xl cursor-pointer hover:text-white"
        onClick={() => {}}
      />{" "}
      <div>
        {path.map((path) => {
          const p = path.length > 0 && path.split("%20").join(" ");
          return (
            <span key={path}>
              /
              <Link
                href={`/${path}`}
                className="cursor-pointer hover:text-gray-300 mx-1 "
              >
                {p}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
