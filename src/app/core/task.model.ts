export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type PriorityTask = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description?: string;
  taskStatus: TaskStatus;
  taskPriority: PriorityTask;
  dueDate?: string;
  createdAt?: string;
}
