import { RoleEntity } from '../../../database/entities/role.entity';
import { RoleResponseDto } from '../models/dto/response/role.response.dto';

export class RoleMapper {
  public static toResponseDto(role: RoleEntity): RoleResponseDto {
    return {
      id: role.id,
      value: role.value,
      description: role.description,
    };
  }
}
