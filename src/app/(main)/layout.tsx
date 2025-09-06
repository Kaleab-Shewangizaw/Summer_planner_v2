"use client";

import Navbar from "@/componenets/Navbar";
import Sidebar from "@/componenets/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UseUserState } from "./store/userStore";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const setUser = UseUserState((state) => state.setUser);
  const clearUser = UseUserState((state) => state.clearUser);
  const user = UseUserState((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) {
      fetch("/api/me")
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log("data:", data);
        });
    } else {
      router.push("/");
    }
  }, [session, status, router, setUser, user]);

  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  if (!session) return null;
  console.log("session is here:", session);
  console.log("user is here: ", user);

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
