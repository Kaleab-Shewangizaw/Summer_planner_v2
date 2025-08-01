"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function Path() {
  const router = useRouter();
  const realPath = usePathname();
  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (realPath) {
      const segments = realPath
        .split("/")
        .filter(Boolean)
        .map((p) => decodeURIComponent(p));
      setPathSegments(segments);
    }
  }, [realPath]);

  if (!hasMounted) return null;

  return (
    <div className="w-full flex gap-10 text-md text-gray-500 py-2 border-b">
      <BsArrowLeft
        className="text-2xl cursor-pointer hover:text-white"
        onClick={() => router.back()}
      />
      <div>
        {pathSegments.map((segment, i) => {
          const href = "/" + pathSegments.slice(0, i + 1).join("/");

          return (
            <span key={href}>
              {i > 0 && <span className="mx-1">/</span>}
              <Link href={href} className="hover:text-gray-300 mx-1">
                {segment}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
