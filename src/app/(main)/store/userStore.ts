"use client";

import { create } from "zustand";

export interface Folder {
  _id: string;
  name: string;
  icon: string;
  isFavorite: boolean;
  projects: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  folders?: Folder[];
  teams?: string[];
  owenedTeams?: string[];
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
}

export const UseUserState = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  clearUser: () => set({ user: null }),
}));
