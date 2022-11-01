export interface Project {
  id: string;
  projectTypeId: string;
  projectType: ProjectType;
  code: string;
  title: string;
  startDate: string;
  endDate: string;
  statusId: string;
  status: Status;
}
export interface ProjectType {
  id: string;
  code: string;
  name: string;
}
export interface Status {
  id: string;
  code: string;
  name: string;
}
export interface Task {
  id: string;
  taskCategoryId: string;
  taskCategory: TaskCategory;
  projectId: string;
  project: Project;
  title: string;
  startDate: string;
  duration: number;
  statusId: string;
  status: Status;
}
export interface TaskCategory {
  id: string;
  code: string;
  name: string;
}
export interface User {
  id: string;
  fullName: string;
  userName: string;
  email: string;
}
export interface TaskAssignment {
  id: string;
  userId: string;
  taskId: string;
}
