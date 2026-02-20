export interface User {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  roles: {
    id: string;
    name: string;
  }[];
}