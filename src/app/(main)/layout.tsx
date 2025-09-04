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
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  if (!session) return null;
  console.log(session);

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
