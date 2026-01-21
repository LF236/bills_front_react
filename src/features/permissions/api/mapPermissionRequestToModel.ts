import type { Permission } from "../domain/permission.model";

export const mapPermissionRequestToModel = (data: any) : Permission => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    deleted_at: data.deleted_at,
    created_at: data.created_at,
    is_active: data.is_active,
    roles: data.roles.map((role: any) => ({
      id: role.id,
      name: role.name,
    })),
  }
}