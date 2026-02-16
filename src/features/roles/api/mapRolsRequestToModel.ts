import type { Rol } from '../domain/rol.model';

export const mapRolsRequestToModel = (data: any) : Rol => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    created_at: data.created_at,
    is_active: data.is_active,
    permissions: data.permissions?.map((permission: any) => ({
      id: permission.id,
      name: permission.name,
      is_active: permission.is_active,
    })) || [],
  }
}