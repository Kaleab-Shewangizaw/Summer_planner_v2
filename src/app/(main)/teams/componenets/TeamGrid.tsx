// components/teams/TeamGrid.tsx
"use client";
import { Team } from "@/utils/types";
import TeamCard from "./TeamCard";

interface TeamGridProps {
  teams: Team[];
  onEditTeam: (team: Team) => void;
  onDeleteTeam: (teamId: string) => void;
}

export default function TeamGrid({
  teams,
  onEditTeam,
  onDeleteTeam,
}: TeamGridProps) {
  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No teams yet
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Create your first team to start collaborating on summer plans with
          your friends, family, or colleagues.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onEdit={onEditTeam}
          onDelete={onDeleteTeam}
        />
      ))}
    </div>
  );
}
