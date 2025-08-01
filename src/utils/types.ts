export interface Column {
  id: number;
  title: string;
}

export interface Task {
  id: number;
  columnId: number;
  content: string;
}
