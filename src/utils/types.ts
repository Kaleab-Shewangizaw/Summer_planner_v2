export type Id = number;

export interface Column {
  id: number;
  title: string;
}

export interface Task {
  id: number;
  columnId: number;
  content: string;
}

export interface Project {
  id: number;
  name: string;
  folderId: number;
  description: string;
  columns: Column[];
}

export interface Folder {
  id: number;
  name: string;
  projects: Project[];
}

export interface Team {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived";
  memberCount: number;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
}
