"use client";

import Link from "next/link";
import { BiFolder } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PiX } from "react-icons/pi";
import { Project } from "@/utils/types";
import { useFolderStore } from "@/app/(main)/tasks/Store/folderStore";

export default function FolderCard({
  name,
  folder,
}: {
  name: string;
  folder: { id: number; name: string; projects: Project[] };
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const deleteFolder = useFolderStore((state) => state.deleteFolder);
  const emptyFolder = useFolderStore((state) => state.emptyFolder);
  const optionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayName = name?.length > 20 ? `${name.substring(0, 17)}...` : name;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleRename = async () => {
    if (newName.trim() && newName.trim() !== name) {
      setIsRenaming(true);
      try {
        await renameFolder(folder.id, newName.trim());
      } catch (error) {
        console.error("Failed to rename folder:", error);
        alert("Failed to rename folder. Please try again.");
        setNewName(name); // Revert to original name
      } finally {
        setIsRenaming(false);
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
      setNewName(name);
    }
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this folder? This action cannot be undone."
      )
    ) {
      setIsDeleting(true);
      try {
        await deleteFolder(folder.id);
      } catch (error) {
        console.error("Failed to delete folder:", error);
        alert("Failed to delete folder. Please try again.");
      } finally {
        setIsDeleting(false);
        setShowOptions(false);
      }
    }
  };

  const handleEmpty = async () => {
    if (
      confirm(
        "Are you sure you want to empty this folder? All projects will be removed."
      )
    ) {
      try {
        await emptyFolder(folder.id);
      } catch (error) {
        console.error("Failed to empty folder:", error);
        alert("Failed to empty folder. Please try again.");
      } finally {
        setShowOptions(false);
      }
    }
  };

  return (
    <div className="relative group">
      {/* Options Button */}
      <button
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-gray-700/50 z-10"
        onClick={() => setShowOptions(!showOptions)}
        disabled={isRenaming || isDeleting}
      >
        {showOptions ? <PiX size={14} /> : <SlOptionsVertical size={14} />}
      </button>

      {/* Options Menu */}
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-10 right-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20 min-w-[140px]"
          ref={optionsRef}
        >
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
            onClick={() => {
              setIsEditing(true);
              setShowOptions(false);
            }}
            disabled={isRenaming}
          >
            Rename
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
            onClick={handleEmpty}
          >
            Empty
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </motion.div>
      )}

      {/* Folder Card */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors duration-200 h-full">
        <Link
          href={`/tasks/${folder.name}`}
          className="flex flex-col items-center text-center h-full"
        >
          <BiFolder className="text-5xl text-blue-400 mb-3" />

          {isEditing ? (
            <div className="w-full">
              <input
                ref={inputRef}
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                  if (e.key === "Escape") {
                    setIsEditing(false);
                    setNewName(name);
                  }
                }}
                className="w-full text-sm bg-gray-700 border border-gray-600 rounded px-2 py-1 text-center focus:outline-none focus:border-blue-500 mb-1"
                disabled={isRenaming}
              />
              {isRenaming && (
                <div className="text-xs text-gray-400">Renaming...</div>
              )}
            </div>
          ) : (
            <>
              <h3 className="font-medium text-gray-100 mb-1 text-sm">
                {displayName}
              </h3>
              <p className="text-xs text-gray-400">
                {folder.projects?.length || 0} project
                {(folder.projects?.length || 0) !== 1 ? "s" : ""}
              </p>
            </>
          )}
        </Link>
      </div>

      {/* Loading Overlay */}
      {(isRenaming || isDeleting) && (
        <div className="absolute inset-0 bg-gray-900/70 rounded-xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
