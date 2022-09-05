import * as cuid from "cuid";

/**
 * Interface for the 'Board' data
 */
export interface BoardEntity {
  id: string;// Primary ID
  name: string;
  desc: string;
  groupList: TaskGroup[];
  taskList: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  created: string;
  priority: string;
  assignee: string;
  group: string;
  // boardId: string;
  // projectId: string;
}

export function getTaskPriority() {
  return ['High', 'Medium', 'Low'];
} 

export interface TaskGroup {
  id: string;
  name: string;
}

export function getDefaultGroupList() {
  return ['To Do', 'In Progress', 'Completed'].map(name => ({name, id: cuid()}))
}