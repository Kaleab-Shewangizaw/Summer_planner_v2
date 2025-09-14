"use client";

import { useState } from "react";
import { LogoutButton } from "./logoutButton";

export default function SettingsPage() {
  const [name, setName] = useState();
  return (
    <div>
      <LogoutButton />
    </div>
  );
}
