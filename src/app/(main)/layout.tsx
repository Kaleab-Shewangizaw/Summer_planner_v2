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
  return <div>{children}</div>;
}
