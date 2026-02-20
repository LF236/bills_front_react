import type { User } from '../domain/user.model';

export const mapUsersRequestToModel = (data: any) : User => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    is_active: data.is_active,
    roles: data.roles?.map((role: any) => ({
      id: role.id,
      name: role.name,
    })) || [],
  }
}