import TeamsCard from "./componenets/teamCard";

export default function TeamsPage() {
  return (
    <div className="h-full max-h-[100%] w-full overflow-auto removeScrollBar">
      <div className="border-t py-5 border-gray-700">
        <div className="flex items-center justify-between mb-3  px-4">
          <p className="text-gray-300 text-lg">Teams</p>
          <div className="flex gap-2">
            <button className="cursor-pointer bg-blue-900/50 rounded-md px-2 py-1 text-sm font-normal hover:bg-blue-900/70 transition-all duration-200 flex items-center gap-2">
              Create a team
            </button>
            <button className="cursor-pointer bg-blue-900/50 rounded-md px-2 py-1 text-sm font-normal hover:bg-blue-900/70 transition-all duration-200 flex items-center gap-2">
              Join a team
            </button>
          </div>
        </div>
        <div className="flex gap-5 justify-start flex-wrap">
          <TeamsCard />
          <TeamsCard />
          <TeamsCard />
          <TeamsCard />
          <TeamsCard />
          <TeamsCard />
          <TeamsCard />
        </div>
      </div>
    </div>
  );
}
