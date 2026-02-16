export interface CreateRolInterface {
  name: string;
  description: string;
  is_active: boolean;
  ids_permissions?: string[];
}


export interface UpdateRolInterface extends CreateRolInterface {
  id: string;
}

