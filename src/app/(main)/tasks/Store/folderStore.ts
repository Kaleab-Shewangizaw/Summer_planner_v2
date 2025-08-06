// stores/useFolderStore.ts
import { create } from "zustand";
import { Folder, Project } from "@/utils/types";

type Store = {
  folders: Folder[];
  projects: Project[];
  createFolder: (name: string) => void;
  deleteFolder: (id: number) => void;
  renameFolder: (id: number, name: string) => void;
  emptyFolder: (id: number) => void;
  addProject: (folderId: number, name: string) => void;
};

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export const useFolderStore = create<Store>((set) => ({
  folders: [],
  projects: [],
  createFolder: (name) =>
    set((state) => ({
      folders: [...state.folders, { id: generateId(), name, projects: [] }],
    })),
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
  addProject: (folderId, name) =>
    set((state) => ({
      projects: [...state.projects, { id: generateId(), folderId, name }],
    })),
}));
