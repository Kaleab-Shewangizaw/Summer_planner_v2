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
  let na = "";
  if (name.length > 20) {
    for (let i = 0; i < 15; i++) {
      na += name[i];
    }
  } else {
    na = name;
  }
  const [showOptions, setShowOptions] = useState(false);
  const deleteFolder = useFolderStore((state) => state.deleteFolder);
  const emptyFolder = useFolderStore((state) => state.emptyFolder);
  const renameFolder = useFolderStore((state) => state.renameFolder);
  const optionsRef = useRef<HTMLDivElement>(null);
  const editNameRef = useRef<HTMLInputElement>(null);
  const [newName, setNewName] = useState(name);
  const [editFolderName, setEditFolderName] = useState(false);

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
    if (editNameRef.current) {
      editNameRef.current.focus();
    } else {
      setEditFolderName(false);
    }
  }, [editFolderName]);
  return (
    <div className="relative group">
      <div
        className="absolute top-2 right-2 hidden group-hover:block z-100 p-2 rounded-full hover:bg-black/35 cursor-pointer "
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        {showOptions ? <PiX /> : <SlOptionsVertical className="" />}
      </div>
      {showOptions && (
        <motion.div
          className="overflow-hidden border flex flex-wrap flex-col w-30 rounded-sm border-blue-400/20 bg-[#131e3c] z-100 absolute top-8 right-1"
          ref={optionsRef}
        >
          <button
            className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200"
            onClick={() => {
              setEditFolderName(true);
              setShowOptions(false);
            }}
          >
            Rename folder
          </button>
          <button
            className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to delete all projects inside this folder?"
                )
              ) {
                emptyFolder(folder.id);
              }
              setShowOptions(false);
            }}
          >
            Empty folder
          </button>

          <button
            className="hover:bg-gray-800 text-xs mt-1 cursor-pointer text-left w-full py-1 px-3 mb-1 rounded-sm transition-all duration-200"
            onClick={() => {
              deleteFolder(folder.id);
            }}
          >
            Delete folder
          </button>
        </motion.div>
      )}
      <Link
        href={`tasks/${name}`}
        className="border border-blue-300/10 text-gray-400 group rounded-sm w-40 py-2 px-2 hover:text-gray-100 cursor-pointer flex flex-col items-center"
      >
        <BiFolder className="text-7xl" />
        {editFolderName ? (
          <input
            ref={editNameRef}
            type="text"
            className="w-full text-sm border rounded-md border-blue-900/50"
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                renameFolder(folder.id, newName);
                setEditFolderName(false);
              } else if (e.key === "Escape") {
                setEditFolderName(false);
              }
            }}
          />
        ) : (
          <p className="text-sm ">{na === name ? na : na + "..."}</p>
        )}
      </Link>
    </div>
  );
}
