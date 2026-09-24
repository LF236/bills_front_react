export interface UserDetailInterface {
  id: string;
  is_active: boolean;
  email: string;
  avatarUrl: string;
  name: string;
  created_at: string;
  roles: {
    id: string;
    name: string;
  }[];
}