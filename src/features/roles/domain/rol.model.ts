export interface Rol {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string | null;
  permissions: {
    id: string;
    name: string;
    is_active: boolean;
  }[];
}