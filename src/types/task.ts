export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  deadline: Date;
  completed: boolean;
  createdAt: Date;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}