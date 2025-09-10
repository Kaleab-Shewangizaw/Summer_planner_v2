import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (name: string, image: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/api/auth/callback/credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.status === 200) {
        // Get user data from session
        const userRes = await axios.get("/api/auth/session");
        set({ user: userRes.data.user, isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        // Auto login after registration
        await useAuthStore.getState().login(email, password);
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Registration failed",
        isLoading: false,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post("/api/auth/signout");
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Logout failed",
        isLoading: false,
      });
    }
  },

  updateUser: async (name: string, image: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put("/api/users/update", {
        name,
        image,
      });

      if (res.status === 200) {
        set({ user: res.data.user, isLoading: false });
      }
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Update failed",
        isLoading: false,
      });
    }
  },
}));
