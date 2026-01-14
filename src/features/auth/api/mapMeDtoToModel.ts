import type { Me } from "../domain/me.model";

export function mapMeDtoToModel(dto: any) : Me {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    is_active: dto.is_active,
  }
}