"use client";

import FolderCard from "@/componenets/FolderCard";
import { useFolderStore } from "./Store/folderStore";
import { useState } from "react";
import { BiFolderPlus } from "react-icons/bi";

export default function TasksPage() {
  const folders = useFolderStore((state) => state.folders);
  const [addingFolder, setAddingFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const createFolder = useFolderStore((state) => state.createFolder);

  return (
    <div className="h-full max-h-[100%] w-full overflow-auto removeScrollBar">
      <div className="border-t py-5 border-gray-700">
        <div className="flex items-center justify-between mb-3  px-4">
          <p className="text-gray-300 text-lg">Folders</p>
          <button
            onClick={() => {
              setAddingFolder(true);
            }}
            className="cursor-pointer bg-blue-900/50 rounded-md px-2 py-1 text-sm font-normal hover:bg-blue-900/70 transition-all duration-200 flex items-center gap-2"
          >
            <BiFolderPlus className="text-3xl text-gray-300" />
          </button>
        </div>
        <div className="flex gap-5 justify-start flex-wrap">
          {folders.length > 0 || addingFolder ? (
            folders.map((folder) => {
              return (
                <FolderCard
                  key={folder.id}
                  name={folder.name}
                  folder={folder}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h2 className="font-light text-4xl w-full mt-5 text-gray-400 text-center">
                No folders
              </h2>
              <h2 className="text-gray-400">Start by creating a new folder</h2>
            </div>
          )}
          {addingFolder && (
            <div className="w-40 flex flex-col items-end mt-3">
              <BiFolderPlus className="text-7xl text-gray-400 self-center" />
              <input
                type="text"
                autoFocus
                placeholder="New folder name"
                className="w-full border border-blue-900/50 px-2 py-2 font-normal focus:outline-0 focus:border-none placeholder:text-gray-600"
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createFolder(folderName);
                    setAddingFolder(false);
                  } else if (e.key === "Escape") {
                    setAddingFolder(false);
                  }
                }}
              />
              <button
                className="cursor-pointer bg-[#152a6e] rounded-md px-2 py-1 text-sm font-normal mt-3"
                onClick={() => {
                  if (folderName.trim().length === 0) {
                    return;
                  }
                  createFolder(folderName);
                  setAddingFolder(false);
                }}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
