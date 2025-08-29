import type { Metadata } from "next";
import TasksSidebar from "./tasksSidebar";
import Path from "@/app/componenets/Path";

export const metadata: Metadata = {
  title: "Summer Planner",
  description:
    "Summer planner is a to do list app with awesome features. Make plans, excute them.",
};

export default function tasksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full  max-h-full w-full  max-w-full flex overflow-auto ">
      <TasksSidebar />

      <div className="flex h-full max-h-full w-full max-w-full overflow-auto flex-col items-center mx-1 ">
        <Path />
        {children}
      </div>
    </div>
  );
}
