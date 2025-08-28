"use client";
// components/teams/TeamModal.tsx
import { useState } from "react";
import { Team } from "@/utils/types";

interface TeamModalProps {
  onClose: () => void;
  onSave: (team: Omit<Team, "id">) => void;
}

export default function TeamModal({ onClose, onSave }: TeamModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      status: "active",
      memberCount: 1,
      members: [{ id: "1", name: "You", email: "" }],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create New Team
          </h2>
          <p className="text-gray-600 mb-6">
            Collaborate with others on your summer plans
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Team Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="e.g., Beach Vacation Crew"
                autoFocus
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="What's this team for?"
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-150"
                disabled={!name.trim()}
              >
                Create Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
