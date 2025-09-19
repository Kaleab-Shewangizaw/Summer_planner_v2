"use client";

import Navbar from "@/componenets/Navbar";
import Sidebar from "@/componenets/SideBar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFolderStore } from "./tasks/Store/folderStore";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();
  const setFolders = useFolderStore((state) => state.setFolders);
  const setSession = useFolderStore((state) => state.setSession);

  useEffect(() => {
    setSession(session);
    if (!isPending && session?.user?.folders) {
      const userFolders =
        typeof session.user.folders === "string"
          ? JSON.parse(session.user.folders)
          : session.user.folders || [];

      setFolders(userFolders);
    }
  }, [session, isPending, setFolders, setSession]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen max-h-screen flex flex-col">
      <Navbar user={session.user} />
      <div className="flex h-[93%] max-h-full w-screen">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
