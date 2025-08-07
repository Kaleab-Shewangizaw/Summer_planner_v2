import BackButton from "./componenets/backComponenet";

export default function teamsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full max-h-full w-full max-w-full flex-col items-center mx-1 ">
      <div className="w-full">
        <BackButton />
      </div>
      {children}
    </div>
  );
}
