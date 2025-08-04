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
}

export interface Folder {
  id: number;
  name: string;
  projects: Project[];
}
