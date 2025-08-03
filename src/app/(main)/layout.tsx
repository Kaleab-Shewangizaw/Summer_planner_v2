import Navbar from "@/componenets/Navbar";
import Sidebar from "@/componenets/SideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Summer Planner",
  description:
    "Summer planner is a to do list app with awesome features. Make plans, excute them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen  max-h-screen  flex flex-col">
      <Navbar />
      <div className="flex h-[93%] max-h-full  w-screen ">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
