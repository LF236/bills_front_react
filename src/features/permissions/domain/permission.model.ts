export interface Permission {
  id: string;
  name: string;
  description: string;
  deleted_at: string | null;
  created_at: string;
  is_active: boolean;
  roles: {
    id: string;
    name: string;
  }[];
}