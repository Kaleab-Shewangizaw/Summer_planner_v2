// stores/useFolderStore.ts
import { create } from "zustand";
import { Column, Folder, Project } from "@/utils/types";

type Store = {
  folders: Folder[];
  projects: Project[];
  setFolders: (folders: Folder[]) => void;
  createFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => void;
  renameFolder: (id: number, name: string) => void;
  emptyFolder: (id: number) => void;
  addProject: (
    folderId: number,
    name: string,
    id: number,
    description: string,
    columns: Column[]
  ) => void;
  deleteProject: (id: number) => void;
  updateProject: (
    folderId: number,
    name: string,
    id: number,
    description: string,
    columns: Column[]
  ) => void;
};

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export const useFolderStore = create<Store>((set) => ({
  folders: [],
  projects: [],
  setFolders: (folders) => set({ folders }),
  createFolder: async (name) => {
    try {
      const response = await fetch("/api/folder/add-folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to create folder");
      }

      const data = await response.json();
      const newFolder = { id: generateId(), name, projects: [] };

      set((state) => ({
        folders: [...state.folders, newFolder],
      }));
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
  },
  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.id !== id),
      projects: state.projects.filter((p) => p.folderId !== id),
    })),
  renameFolder: (id, name) =>
    set((state) => ({
      folders: state.folders.map((f) => (f.id === id ? { ...f, name } : f)),
    })),
  emptyFolder: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.folderId !== id),
    })),
  addProject: (folderId, name, id, description, columns) =>
    set((state) => ({
      projects: [
        ...state.projects,
        { id: generateId(), folderId, name, description: "", columns },
      ],
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
  updateProject: (folderId, name, id, description, columns) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, name, description, folderId, columns } : p
      ),
    })),
}));
