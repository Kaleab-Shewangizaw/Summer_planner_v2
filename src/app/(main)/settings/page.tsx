"use client";

export default function SettingsPage() {
  const handleSignout = () => {
    alert("Sign out clicked");
  };
  return (
    <div>
      <button
        onClick={() => {
          handleSignout();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
