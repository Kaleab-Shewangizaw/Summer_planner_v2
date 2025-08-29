export type Id = number;

export interface Column {
  id: number;
  title: string;
}

export interface Task {
  id: number;
  content: string;
  description?: string;
  columnId: number;
  columnName?: string;
  status: "completed" | "in-progress";
  dueDate?: string;
  checklistItems?: ChecklistItem[];
  attachments?: Attachment[];
  tags?: Tag[];
}

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface Attachment {
  id: number;
  name: string;
  url: string;
  type: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
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
