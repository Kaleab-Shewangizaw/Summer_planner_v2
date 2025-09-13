"use client";

import Navbar from "@/componenets/Navbar";
import Sidebar from "@/componenets/SideBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
