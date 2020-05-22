export default interface Task {
  id?: string;
  name?: string;
  createdBy?: string;
  completed?: boolean;
  priority?: string;
  dateOfCreate?: number;
  deadline?: number;
  description?: string; 
  assignee?: string;
  project?: string;
}