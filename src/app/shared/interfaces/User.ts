import { IProjectShort } from './Project';

export default interface User {
  uid?: string;
  name?: string;
  email?: string;
  role?: string;
  projects?: IProjectShort[];
}
