"use client";

import Navbar from "@/componenets/Navbar";
import Sidebar from "@/componenets/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "loading") return;

      if (!session?.user) {
        router.push("/");
      }
    };

    fetchUser();
  }, [session, router, status]);

  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="h-screen max-h-screen flex flex-col">
      <Navbar />
      <div className="flex h-[93%] max-h-full w-screen">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
