export interface CreatePermissionInterface {
  name: string;
  description: string;
}

export interface UpdatePermissionInterface extends CreatePermissionInterface {
  id: string;
  is_active: boolean;
  ids_roles?: string[];
}