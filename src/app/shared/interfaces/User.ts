export default interface User {
  uid?: string;
  name?: string;
  email?: string;
  role?: string;
  projects?: string[];
  tasks?: string[];
  meetings?: string[];
}
