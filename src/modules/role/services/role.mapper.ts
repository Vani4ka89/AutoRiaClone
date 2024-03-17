import { RoleEntity } from '../../../database/entities/role.entity';
import { RoleResponseDto } from '../models/dto/response/role.response.dto';

export class RoleMapper {
  public static toResponseDto(roleEntity: RoleEntity): RoleResponseDto {
    return {
      id: roleEntity.id,
      value: roleEntity.value,
      description: roleEntity.description,
      created: roleEntity.created,
      updated: roleEntity.updated,
    };
  }
}
