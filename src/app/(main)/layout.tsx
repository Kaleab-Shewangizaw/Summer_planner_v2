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
    <div className=" max-h-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex h-full ">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
