"use client";

import { useFolderStore } from "./Store/folderStore";

export default function TasksPage() {
  const folders = useFolderStore((state) => state.folders);

  return (
    <div className="h-full max-h-[100%] w-full overflow-auto removeScrollBar">
      <div className="border-b py-5 border-gray-700">
        <p>Folders</p>
        <div className="flex gap-5 justify-start flex-wrap">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="bg-white/5 border border-gray-700 p-4 rounded-md"
            >
              {folder.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
