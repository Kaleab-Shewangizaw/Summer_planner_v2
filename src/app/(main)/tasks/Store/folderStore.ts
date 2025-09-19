import { create } from "zustand";
import { Column, Folder, Project } from "@/utils/types";

type Store = {
  folders: Folder[];
  projects: Project[];
  session: any;
  setFolders: (folders: Folder[]) => void;
  setSession: (session: any) => void;
  createFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
  emptyFolder: (id: number) => Promise<void>;
  addProject: (
    name: string,
    description: string,
    priority: "high" | "medium" | "low",
    folderName: string,
    ownerId: string,
    teamId?: string
  ) => Promise<void>;
  deleteProject: (folderId: number, projectId: number) => Promise<void>;
  updateProject: (
    folderId: number,
    projectId: number,
    name: string,
    description: string,
    columns: Column[]
  ) => Promise<void>;
};

export const useFolderStore = create<Store>((set, get) => ({
  folders: [],
  projects: [],
  session: null,

  setFolders: (folders) => set({ folders }),
  setSession: (session) => set({ session }),

  createFolder: async (name) => {
    try {
      const response = await fetch("/api/folder/add-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Failed to create folder");

      const data = await response.json();

      set({ folders: data.folders });
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
  },

  deleteFolder: async (id: number) => {
    try {
      const response = await fetch("/api/folder/delete-folder", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderId: id }),
      });

      if (!response.ok) throw new Error("Failed to delete folder");

      const data = await response.json();

      set({
        folders: data.folders,
        projects: get().projects.filter((p) => p.folderId !== id),
      });
    } catch (error) {
      console.error("Error deleting folder:", error);
      throw error;
    }
  },

  renameFolder: async (id: number, name: string) => {
    try {
      const response = await fetch("/api/folder/update-folder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderId: id, name }),
      });

      if (!response.ok) throw new Error("Failed to rename folder");

      set((state) => ({
        folders: state.folders.map((f) => (f.id === id ? { ...f, name } : f)),
      }));
    } catch (error) {
      console.error("Error renaming folder:", error);
      throw error;
    }
  },

  emptyFolder: async (id: number) => {
    try {
      set((state) => ({
        projects: state.projects.filter((p) => p.folderId !== id),
      }));

      const response = await fetch("/api/folder/empty-folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderId: id }),
      });

      if (!response.ok) throw new Error("Failed to empty folder");
    } catch (error) {
      console.error("Error emptying folder:", error);
      throw error;
    }
  },

  addProject: async (name, description, priority, folderName, teamId) => {
    try {
      const response = await fetch("/api/project/add-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          priority,
          folderName,
          teamId: teamId || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to add project");

      const data = await response.json();

      if (data.success) {
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.name === folderName
              ? {
                  ...folder,
                  projects: [...(folder.projects || []), data.project],
                }
              : folder
          ),
        }));
      }

      return data;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  },
  deleteProject: async (folderId: number, projectId: number) => {
    try {
      const response = await fetch("/api/project/delete-project", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderId, projectId }),
      });

      if (!response.ok) throw new Error("Failed to delete project");

      set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
      }));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },

  updateProject: async (
    folderId: number,
    projectId: number,
    name: string,
    description: string,
    columns: Column[]
  ) => {
    try {
      const response = await fetch("/api/project/update-project", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folderId,
          projectId,
          name,
          description,
          columns,
        }),
      });

      if (!response.ok) throw new Error("Failed to update project");

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? { ...p, name, description, columns } : p
        ),
      }));
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },
}));
