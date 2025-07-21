import type { Metadata } from "next";
import TasksSidebar from "./tasksSidebar";
import Path from "@/componenets/Path";

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
    <div className="h-full  max-h-full  w-full flex">
      <TasksSidebar />

      <div className="flex h-full max-h-full w-full flex-col items-center mx-1">
        <Path />
        {children}
      </div>
    </div>
  );
}
