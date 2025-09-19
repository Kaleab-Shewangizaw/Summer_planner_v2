import { User as BetterAuthUser } from "better-auth";

export interface FolderProject {
  title: string;
  id: string;
  priority: "high" | "medium" | "low";
  team?: string;
  description?: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  projects: FolderProject[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMembership {
  teamId: string;
  role: "owner" | "admn" | "member";
  joindAt: Date;
}

export interface CustomUserFields {
  folders: Folder[];
  teams: TeamMembership[];
  profileImage?: string;
}

export type User = BetterAuthUser & CustomUserFields;
