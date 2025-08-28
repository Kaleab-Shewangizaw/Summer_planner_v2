"use client";
// components/teams/TeamCard.tsx
import { Team } from "@/utils/types";
import { BiEdit, BiTrash, BiUser } from "react-icons/bi";

interface TeamCardProps {
  team: Team;
  onEdit: (team: Team) => void;
  onDelete: (teamId: string) => void;
}

export default function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(team)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
            >
              <BiEdit />
            </button>
            <button
              onClick={() => onDelete(team.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
            >
              <BiTrash />
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">{team.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-500">
            <BiUser className="text-lg" />
            <span>{team.memberCount} members</span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              team.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {team.status}
          </span>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex -space-x-2">
          {team.members.slice(0, 5).map((member) => (
            <div
              key={member.id}
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
            >
              {member.name.charAt(0)}
            </div>
          ))}
          {team.memberCount > 5 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs font-bold border-2 border-white">
              +{team.memberCount - 5}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
