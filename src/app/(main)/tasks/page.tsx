"use client";

import FolderCard from "@/componenets/FolderCard";
import { useFolderStore } from "./Store/folderStore";
import { useState } from "react";
import { BiFolderPlus } from "react-icons/bi";

export default function TasksPage() {
  const folders = useFolderStore((state) => state.folders);
  const createFolder = useFolderStore((state) => state.createFolder);
  const [addingFolder, setAddingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFolder = async () => {
    const fdName = folderName.trim();
    if (!fdName) return;

    // Ensure unique folder names

    if (folders.find((f) => f.name === fdName)) {
      let counter = 1;
      let newName = fdName || "Untitled";
      while (folders.find((f) => f.name === `${newName} (${counter})`)) {
        counter++;
      }
      setFolderName(`${newName} (${counter})`);
      return;
    }

    setIsLoading(true);
    try {
      await createFolder(fdName);
      setAddingFolder(false);
      setFolderName("");
    } catch (error) {
      console.error("Failed to create folder:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddFolder();
    } else if (e.key === "Escape") {
      setAddingFolder(false);
      setFolderName("");
    }
  };

  return (
    <div className="h-full max-h-[100%] w-full overflow-auto px-2">
      <div className="border-t border-gray-700 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-100">My Folders</h1>
            <p className="text-gray-400 text-sm mt-1">
              Organize your projects into folders
            </p>
          </div>
          <button
            onClick={() => setAddingFolder(true)}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BiFolderPlus className="text-lg" />
            New Folder
          </button>
        </div>

        {/* Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
          {/* Existing folders */}
          {folders.map((folder) => (
            <FolderCard key={folder.id} name={folder.name} folder={folder} />
          ))}

          {/* Add Folder Card */}
          {addingFolder && (
            <div className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px]">
              <BiFolderPlus className="text-4xl text-gray-400 mb-4" />
              <input
                type="text"
                autoFocus
                disabled={isLoading}
                placeholder="Folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-500 disabled:opacity-50 text-white mb-3"
              />
              <div className="flex gap-2 w-full">
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setAddingFolder(false);
                    setFolderName("");
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading || !folderName.trim()}
                  onClick={handleAddFolder}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Adding..." : "Create"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {folders.length === 0 && !addingFolder && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BiFolderPlus className="text-6xl text-gray-400 mb-6" />
            <h2 className="text-2xl font-light text-gray-300 mb-2">
              No folders yet
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Create your first folder to organize your projects and tasks
            </p>
            <button
              onClick={() => setAddingFolder(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <BiFolderPlus className="text-lg" />
              Create First Folder
            </button>
          </div>
        )}

        {/* Quick Stats */}
        {folders.length > 0 && (
          <div className="mt-8 p-4 bg-gray-800/30 rounded-lg">
            <p className="text-sm text-gray-400">
              {folders.length} folder{folders.length !== 1 ? "s" : ""} • Total
              projects:{" "}
              {folders.reduce(
                (acc, folder) => acc + (folder.projects?.length || 0),
                0
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
