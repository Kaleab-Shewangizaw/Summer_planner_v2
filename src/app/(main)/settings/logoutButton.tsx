"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      className="bg-red-600 text-white px-3 py-1 rounded"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Log Out
    </button>
  );
}
