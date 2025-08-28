"use client";
// components/teams/TeamHeader.tsx
import { BiSearch, BiPlus } from "react-icons/bi";

interface TeamHeaderProps {
  teamCount: number;
  onAddTeam: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TeamHeader({
  teamCount,
  onAddTeam,
  searchQuery,
  onSearchChange,
}: TeamHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
          <p className="text-gray-600 mt-1">
            {teamCount} {teamCount === 1 ? "team" : "teams"} • Collaborate with
            your team members
          </p>
        </div>

        <button
          onClick={onAddTeam}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <BiPlus className="text-xl" />
          Create Team
        </button>
      </div>

      <div className="relative">
        <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
    </div>
  );
}
